class Game
{
  constructor()
  {
    this.cookies = new Cookies();

    this.gramsPerSpool = 1000;

    this.defaultVariables = {
      money:50,
      printers:[],
      filament:{},
      products:[]
    };

    this.allPrinters = {
      tncV53dPrinter:{
        name:"TNC V5",
        type:"Filament Printer",
        cost:250,
        speedMultiplier:1,
        qualityMultiplier:1,
        errorRate:0.15,
        filaments:["ABS","PLA"],
      },
      plastech3dPrinter:{
        name:"PlasTech Printer",
        type:"Filament Printer",
        cost:625,
        speedMultiplier:1.125,
        qualityMultiplier:1,
        errorRate:0.1,
        filaments:["ABS","PLA","PETG"],
      },
      resinate3ResinPrinter:{
        name:"Resinate 3",
        type:"Resin Printer",
        cost:1525,
        speedMultiplier:0.75,
        qualityMultiplier:2,
        errorRate:0.05,
        filaments:["TPU","Nylon 12"]
      },
      resinate4ResinPrinter:{
        name:"Resinate 4",
        type:"Resin Printer",
        cost:1850,
        speedMultiplier:0.85,
        qualityMultiplier:2.25,
        errorRate:0.1,
        filaments:["TPU","Nylon 11","Nylon 12"]
      },
    };

    this.allFilaments = {
      ABS:{
        name:"ABS",
        fullName:"Acrylonitrile Butadiene Styrene",
        applications:[
          "Functional Prototypes"
        ],
        qualityMultiplier:1,
        printTimeMultiplier:1,
        costPerGram:20/this.gramsPerSpool,
        costPerSpool:20
      },
      PLA:{
        name:"PLA",
        fullName:"Polylactic Acid",
        applications:[
          "Functional Prototypes",
          "Concept Models"
        ],
        qualityMultiplier:1.25,
        printTimeMultiplier:1.125,
        costPerGram:22.5/this.gramsPerSpool,
        costPerSpool:22.5
      },
      PETG:{
        name:"PETG",
        fullName:"Polyethylene Terephthalate Glycol",
        applications:[
          "Functional Prototypes",
          "Concept Models",
          "Waterproof Applications",
          "Snap-fit Components"
        ],
        qualityMultiplier:1.75,
        printTimeMultiplier:1.125,
        costPerGram:24/this.gramsPerSpool,
        costPerSpool:24
      },
      TPU:{
        name:"TPU",
        fullName:"Thermoplastic Polyurethane",
        applications:[
          "Functional Prototypes",
          "Flexible Prototypes",
          "Medical Devices"
        ],
        qualityMultiplier:1.5,
        printTimeMultiplier:0.75,
        costPerGram:40/this.gramsPerSpool,
        costPerSpool:40
      },
      PETG_CF:{
        name:"PETG+CF",
        fullName:"Carbon Fiber Reinforced Polyethylene Terephthalate Glycol",
        applications:[
          "Functional Prototypes",
          "Jigs, Fixtures, and Tooling"
        ],
        qualityMultiplier:1.5,
        costPerGram:51/this.gramsPerSpool,
        costPerSpool:51
      },
      NYLON_12:{
        name:"Nylon 12",
        fullName:"Polyamide 12",
        applications:[
          "Functional Prototypes",
          "End-use Parts",
          "Medical Devices"
        ],
        qualityMultiplier:4,
        costPerGram:124/this.gramsPerSpool,
        costPerSpool:124
      },
      NYLON_11:{
        name:"Nylon 11",
        fullName:"Polyamide 11",
        applications:[
          "Functional Prototypes",
          "Flexible Prototypes",
          "End-use Parts",
          "Medical Devices"
        ],
        qualityMultiplier:4,
        costPerGram:136/this.gramsPerSpool,
        costPerSpool:136
      }
    };

    this.allProducts = {
      whistle:{
        name:"Whistle",
        filamentGrams:48,
        filaments:["ABS"],
        printTime:10
      },
      mug:{
        name:"Mug",
        filamentGrams:360,
        filaments:["ABS","PLA"],
        printTime:90
      }
    };

    this.variables = {};
  }

  init()
  {
    this.initVariables();
  }

  initVariables()
  {
    if (this.cookies.get("variables"))
    {
      this.resetVariables();
    } else
    {
      this.createVariables();
      this.startup();
    }
  }

  createVariables()
  {
    this.variables = {...this.defaultVariables};
    this.updateVariables();
  }

  startup()
  {
    this.getPrinter("tncV53dPrinter");
    this.getFilamentSpool("ABS");
    this.getFilamentSpool("PETG");
  }

  getPrinter(id,add_printer=true)
  {
    var printer = {...this.allPrinters[id]};

    printer.job = null;
    printer.jobQueue = [];

    if (add_printer)
    {
      this.variables.printers.push(printer);
      this.updateVariables();
      this.updateHTML();
    }

    return printer;
  }

  buyFilamentSpool(id)
  {
    this.getFilamentSpool(id);
    this.variables.money-=this.allFilaments[id].costPerGram*this.gramsPerSpool;
    this.updateVariables();
    this.updateHTML();
  }

  getFilamentSpool(id,add_filament=true)
  {
    var spool = {...this.allFilaments[id]};

    spool.grams = this.gramsPerSpool;

    if (add_filament)
    {
      if (this.variables.filament.hasOwnProperty(id))
      {
        this.variables.filament[id].grams+=this.gramsPerSpool;
        spool = {...this.variables.filament[id]};
      } else
      {
        this.variables.filament[id] = spool;
      }
      this.updateVariables();
      this.updateHTML();
    }

    return spool;
  }

  storeProduct(product)
  {
    this.variables.products.push(product);
    this.updateVariables();
    this.updateHTML();
  }

  printProduct(product_id,printer)
  {
    var product = {...this.allProducts[product_id]};

    product.printTime*=printer.speedMultiplier;
    product.filamentGramsSpent = 0;

    printer.jobQueue.push(product);

    this.updateVariables();
    this.updateHTML();

    return product;
  }

  canPrintProduct(product_id,printer)
  {
    var product = {...this.allProducts[product_id]};

    var hasFilament = false;

    for (var printerFilament of printer.filaments)
    {
      if (product.filaments.includes(printerFilament) && this.variables.filaments.hasOwnProperty(printerFilament) && this.variables.filaments[printerFilament] >= product.filamentGrams)
      {
        hasFilament = true;
        break;
      }
    }

    return hasFilament;
  }

  updateHTML()
  {
    this.updateStatsHTML();
    this.updateFilamentsHTML();
  }

  updateStatsHTML()
  {
    var statsRow = document.getElementById('stats-row');
    var stats = statsRow.children;
    stats[0].innerHTML = "Money: <span class='stat-value'>$"+this.variables.money+"</span>";
  }

  updateFilamentsHTML()
  {
    var filamentTable = document.getElementById('filament-table');

    for (var filamentId in this.variables.filament) {
      var filament = this.variables.filament[filamentId];

      var filamentRow = document.getElementById(filament.name.toLowerCase()+"-filament");

      if (!filamentRow)
      {
        filamentRow = document.createElement('tr');
        filamentRow.id = filament.name.toLowerCase()+"-filament";
        filamentRow.className = "filament-row";

        var filamentTitle = document.createElement('td');
        filamentTitle.innerHTML = filament.name;
        filamentTitle.className = 'filament-title';

        var filamentGrams = document.createElement('td');
        filamentGrams.innerHTML = filament.grams+'g';
        filamentGrams.className = 'filament-grams';

        var buyButton = document.createElement('button');
        var priceClass = (this.variables.money >= filament.costPerGram*this.gramsPerSpool) ? "can-afford" : "no-afford";
        buyButton.innerHTML = 'Buy 1 '+filament.name+' Spool (<span class="'+priceClass+'">$'+filament.costPerGram*this.gramsPerSpool+' </span>)';
        buyButton.className = 'filament-buy-spool-button button';
        buyButton.setAttribute("onClick","game.buyFilamentSpool('"+filamentId+"')");

        filamentRow.appendChild(filamentTitle);
        filamentRow.appendChild(filamentGrams);
        filamentRow.appendChild(buyButton);

        filamentTable.appendChild(filamentRow);
      } else
      {
        var children = filamentRow.children;

        var priceClass = (this.variables.money >= filament.costPerGram*this.gramsPerSpool) ? "can-afford" : "no-afford";

        children[1].innerHTML = filament.grams+'g';
        children[2].innerHTML = 'Buy 1 '+filament.name+' Spool (<span class="'+priceClass+'">$'+filament.costPerGram*this.gramsPerSpool+' </span>)';
      }
    }
  }

  resetVariables()
  {
    this.variables = JSON.parse(this.cookies.get("variables"));
  }

  updateVariables()
  {
    this.cookies.set("variables",JSON.stringify(this.variables));
  }
}
