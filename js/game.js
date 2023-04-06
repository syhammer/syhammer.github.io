class Game
{
  constructor()
  {
    this.cookies = new Cookies();
    this.idGenerator = new IDGenerator();

    this.gramsPerSpool = 1000;

    this.defaultVariables = {
      money:0,
      printers:[],
      filament:{},
      products:[],
      inventory:[],
      clientele:10,
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
      }
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
        id:"whistle",
        name:"Whistle",
        filamentGrams:48,
        filament:"ABS",
        printTime:10,
        sellingPrice:1.49
      },
      mug:{
        id:"mug",
        name:"Mug",
        filamentGrams:360,
        filament:"ABS",
        printTime:90,
        sellingPrice:9.45
      },
      fidget_spinner:{
        id:"fidget_spinner",
        name:"Fidget Spinner",
        filamentGrams:240,
        filament:"PLA",
        printTime:15,
        sellingPrice:2.25
      }
    };

    this.variables = {};

    this.clientele = [];
    this.clienteleChangeProbability = 0.01;

    this.filamentPrinterErrorMessages = ["The nozzle was clogged","Corrupted GCODE file","Filament disconnected by heat-creep"];
    this.resinPrinterErrorMessages = ["The resin solidified","The LCD broke","The resin cured too long"];
  }

  init()
  {
    this.initVariables();
    this.initClientele();
    this.updateHTML();
  }

  initClientele()
  {
    for (var i = 0; i < this.variables.clientele; i++)
    {
      this.clientele.push(this.createClient());
    }
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

  createClient()
  {
    return this.getBiasedProductId();
  }

  updateClientele()
  {
    if (Math.random() < this.clienteleChangeProbability)
    {
      var index = Math.floor(Math.random()*this.clientele.length);
      this.clientele[index] = this.createClient();
    }

    for (var i = this.variables.inventory.length-1; i >= 0; i--)
    {
      var index = this.clientele.indexOf(this.variables.inventory[i].id);
      if (index != -1)
      {
        this.variables.money+=this.variables.inventory[i].sellingPrice;
        this.variables.inventory.splice(this.variables.inventory.indexOf(this.variables.inventory[i]),1);
        this.clientele[index] = this.createClient();
        this.updateVariables();
        this.updateHTML();
      }
    }
  }

  getRandomProductId()
  {
    var keys = Object.keys(this.allProducts);
    var index = Math.floor(Math.random()*keys.length);
    return this.allProducts[keys[index]].id;
  }

  getBiasedProductId()
  {
    var products = Object.keys(this.allProducts);
    var total = 0;

    for (var productId of products) {
      total+=this.allProducts[productId].sellingPrice;
    }

    var index = Math.random()*total;
    var marker = 0;

    for (var productId of products) {
      var price = this.allProducts[productId].sellingPrice;

      if (index >= marker && index < marker+price)
      {
        return productId;
      }

      marker+=price;
    }
  }

  startup()
  {
    this.getPrinter("tncV53dPrinter");
    this.getPrinter("tncV53dPrinter");
    this.getPrinter("tncV53dPrinter");
    this.getPrinter("plastech3dPrinter");
    this.getPrinter("plastech3dPrinter");
    this.getPrinter("plastech3dPrinter");
    this.getFilamentSpool("ABS");
    this.discoverProduct("whistle");
    this.discoverProduct("fidget_spinner");
  }

  discoverFilament(filamentId)
  {
    var filament = {...this.allFilaments[filamentId]};

    filament.grams = 0;
    this.variables.filament[filamentId] = filament;
  }

  update()
  {
    this.updatePrinters();
    this.updateClientele();
  }

  updatePrinters()
  {
    for (var printer of this.variables.printers)
    {
      if (!printer.job && printer.jobQueue.length > 0)
      {
        printer.job = printer.jobQueue.pop();
      }

      if (printer.job)
      {
        this.printJob(printer);
      }

      this.updatePrinterDisplay(printer);
    }

    this.updateVariables();
    this.updateHTML();
  }

  printJob(printer)
  {
    var now = new Date();

    var timeLeft = (printer.job.endTime.getTime()-now.getTime())/60000;
    var timeElapsed = (now.getTime()-printer.job.startTime.getTime())/60000;

    printer.job.filamentGramsSpent = (timeElapsed/printer.job.printTime)*printer.job.filamentGrams;

    if (printer.job.errorTime && printer.job.errorTime.getTime() >= now.getTime())
    {
      this.variables.filament[printer.job.filament].grams-=printer.job.filamentGramsSpent;
      printer.error = this.getPrinterErrorMessage(printer.type);
      printer.job = null;
    } else if (timeLeft <= 0)
    {
      this.storeProductInventory(printer.job);
      this.variables.filament[printer.job.filament].grams-=printer.job.filamentGrams;
      printer.job = null;
    }
  }

  getPrinterErrorMessage(printerType)
  {
    if (printerType == 'Filament Printer')
    {
      var index = Math.floor(Math.random()*this.filamentPrinterErrorMessages.length);
      return this.filamentPrinterErrorMessages[index];
    } else if (printerType == 'Resin Printer')
    {
      var index = Math.floor(Math.random()*this.resinPrinterErrorMessages.length);
      return this.resinPrinterErrorMessages[index];
    }
  }

  updatePrinterDisplay(printer)
  {
    var printerDisplay = document.getElementById(printer.id).querySelector('.printer-status').querySelector('.printer-status-row').querySelector('.printer-info').querySelector('.printer-display');

    if (printer.error)
    {
      printerDisplay.innerHTML = '<span class="printer-display-status">ERROR!</span><br><span class="error-message">'+printer.error+'</span>';
    } else if (printer.job != null)
    {
      var now = new Date();
      var timeLeft = (printer.job.endTime.getTime()-now.getTime())/60000;
      printerDisplay.innerHTML = '<span class="printer-display-status">PRINTING...</span><br><span class="print-time">'+Math.ceil(timeLeft)+' minutes left</span>';
    } else
    {
      printerDisplay.innerHTML = '<span class="printer-display-status">IDLE</span>';
    }
  }

  getPrinter(id,add_printer=true)
  {
    var printer = {...this.allPrinters[id]};

    printer.id = this.idGenerator.generate();
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
    if (this.variables.money >= this.allFilaments[id].costPerGram*this.gramsPerSpool)
    {
      this.variables.money-=this.allFilaments[id].costPerGram*this.gramsPerSpool;
      this.getFilamentSpool(id);
      this.updateVariables();
      this.updateHTML();
    }
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

  storeProductInventory(product,update)
  {
    this.variables.inventory.push(product);

    if (update)
    {
      this.updateVariables();
      this.updateHTML();
    }
  }

  discoverProduct(productId)
  {
    var product = {...this.allProducts[productId]};
    this.variables.products.push(product);
    this.updateVariables();
    this.updateHTML();
  }

  printProduct(product_id,printer)
  {
    var product = {...this.allProducts[product_id]};

    if (this.variables.filament[product.filament].grams < product.filamentGrams)
    {
      return;
    }

    product.printTime*=printer.speedMultiplier;
    product.sellingPrice*=printer.qualityMultiplier;
    product.filamentGramsSpent = 0;
    product.startTime = new Date();
    product.endTime = new Date(product.startTime);
    product.endTime.addMinutes(product.printTime);

    if (Math.random() <= printer.errorRate)
    {
      product.errorTime = new Date(product.startTime);
      product.errorTime.addMinutes(product.printTime*Math.random());
    } else
    {
      product.errorTime = null;
    }

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
      if (product.filament == printerFilament && this.variables.filaments.hasOwnProperty(printerFilament) && this.variables.filaments[printerFilament] >= product.filamentGrams)
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
    this.updatePrintersHTML();
  }

  updateStatsHTML()
  {
    var statsRow = document.getElementById('stats-row');
    var stats = statsRow.children;
    stats[0].innerHTML = "Money: <span class='stat-value'>$"+this.variables.money+"</span>";
    stats[1].innerHTML = "Clientele: <span class='stat-value'>"+this.variables.clientele+" clients</span>";
  }

  updateFilamentsHTML()
  {
    var filamentTable = document.getElementById('filament-table');

    for (var filamentId in this.variables.filament) {
      var filament = this.variables.filament[filamentId];

      var filamentRow = document.getElementById(filament.name.toLowerCase()+"-filament");
      var buyButton;

      var canAfford = (this.variables.money >= filament.costPerGram*this.gramsPerSpool);

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

        buyButton = document.createElement('button');
        var priceClass = (canAfford) ? "can-afford" : "no-afford";
        buyButton.innerHTML = 'Buy 1 '+filament.name+' Spool (<span class="'+priceClass+'">$'+filament.costPerGram*this.gramsPerSpool+' </span>)';
        buyButton.className = 'filament-buy-spool-button button';

        buyButton.setAttribute("onClick","game.buyFilamentSpool('"+filamentId+"')");

        filamentRow.appendChild(filamentTitle);
        filamentRow.appendChild(filamentGrams);
        filamentRow.appendChild(buyButton);

        filamentTable.appendChild(filamentRow);
      } else
      {
        buyButton = filamentRow.querySelector('.filament-buy-spool-button');

        var children = filamentRow.children;

        var priceClass = (this.variables.money >= filament.costPerGram*this.gramsPerSpool) ? "can-afford" : "no-afford";

        children[1].innerHTML = filament.grams+'g';
        children[2].innerHTML = 'Buy 1 '+filament.name+' Spool (<span class="'+priceClass+'">$'+filament.costPerGram*this.gramsPerSpool+' </span>)';
      }

      if (!canAfford)
      {
        buyButton.disabled = true;
      }
    }
  }

  updatePrintersHTML()
  {
    var printersList = document.getElementById('printers-list');

    for (var printer of this.variables.printers)
    {
      var printerDiv = document.getElementById(printer.id);
      var printerInfo, printerControl;

      if (!printerDiv)
      {
        printerDiv = document.createElement('li');
        printerDiv.className = 'printer full';
        printerDiv.id = printer.id;

        var printerStatus = document.createElement('table');
        printerStatus.className = 'printer-status';

        var printerStatusRow = document.createElement('tr');
        printerStatusRow.className = 'printer-status-row';

        printerInfo = document.createElement('td');
        printerInfo.className = 'printer-info printer-cell';

        printerControl = document.createElement('td');
        printerControl.className = 'printer-control printer-cell';

        var printerTitle = document.createElement('h3');
        printerTitle.className = 'printer-title'
        printerTitle.innerHTML = printer.name;

        var printerType = document.createElement('h5');
        printerType.className = 'printer-type';
        printerType.innerHTML = printer.type;

        printerInfo.appendChild(printerTitle);
        printerInfo.appendChild(printerType);

        printerStatusRow.appendChild(printerInfo);
        printerStatusRow.appendChild(printerControl);
        printerStatus.appendChild(printerStatusRow);

        printerDiv.appendChild(printerStatus);

        printersList.appendChild(printerDiv);
      } else
      {
        printerInfo = printerDiv.querySelector('.printer-status').querySelector('.printer-status-row').querySelector('.printer-info');
        printerControl = printerDiv.querySelector('.printer-status').querySelector('.printer-status-row').querySelector('.printer-control');
      }

      var printerDisplay = printerInfo.querySelector('.printer-display');

      if (!printerDisplay)
      {
        printerDisplay = document.createElement('h4');
        printerDisplay.className = 'printer-display';

        printerInfo.appendChild(printerDisplay);
      }

      var productInformation = printerControl.querySelector('.product-info');

      if (!productInformation)
      {
        productInformation = document.createElement('ul');
        productInformation.className = 'product-info hidden';
        printerControl.appendChild(productInformation);
      }

      var productTable = printerControl.querySelector('.product-table');
      var productRow;

      if (!productTable)
      {
        productTable = document.createElement('table');
        productTable.className = 'product-table';

        productRow = document.createElement('tr');
        productRow.className = 'product-row';

        productTable.appendChild(productRow);

        printerControl.appendChild(productTable);
      } else
      {
        productRow = printerControl.querySelector('.product-table').querySelector('.product-row');
      }

      var productDropdown = productRow.querySelector('.product-dropdown');

      if (!productDropdown)
      {
        productDropdown = document.createElement('select');
        productDropdown.className = 'product-dropdown';

        productDropdown.addEventListener('change',() => {
          var productOption = productDropdown.value;

          if (this.allProducts.hasOwnProperty(productOption))
          {
            this.updateProductInformation(printer.id,productOption);
          } else
          {
            this.clearProductInformation(printer.id);
          }
        });

        var defaultProductDropdownOption = document.createElement('option');
        defaultProductDropdownOption.className = 'product-dropdown-option';
        defaultProductDropdownOption.innerHTML = 'Choose a Product to Print';
        defaultProductDropdownOption.selected = true;

        productDropdown.appendChild(defaultProductDropdownOption);

        for (var product of this.variables.products)
        {
          var productDropdownOption = document.createElement('option');
          productDropdownOption.className = 'product-dropdown-option';
          productDropdownOption.innerHTML = product.name;
          productDropdownOption.value = product.id;

          productDropdown.appendChild(productDropdownOption);
        }

        productRow.appendChild(productDropdown);
      } else
      {
        var productOptions = productDropdown.children;
        var childrenNames = [];

        for (var child of productOptions)
        {
          childrenNames.push(child.innerHTML);
        }

        for (var product of this.variables.products)
        {
          if (!childrenNames.includes(product.name))
          {
            var productDropdownOption = document.createElement('option');
            productDropdownOption.className = 'product-dropdown-option';
            productDropdownOption.innerHTML = product.name;
            productDropdownOption.value = product.id;

            productDropdown.appendChild(productDropdownOption);
          }
        }
      }

      productDropdown.disabled = (printer.job != null);

      var printButton = productRow.querySelector('.print-button');

      if (!printButton)
      {
        printButton = document.createElement('button');
        printButton.className = 'print-button button';
        printButton.innerHTML = 'Print';
        printButton.onclick = () => {
          this.printProductFromId(printer.id);
        };
        productRow.appendChild(printButton);
      }
    }
  }

  printProductFromId(printerId)
  {
    var productId = document.getElementById(printerId).querySelector('.printer-status').querySelector('.printer-status-row').querySelector('.printer-control').querySelector('.product-table').querySelector('.product-row').querySelector('.product-dropdown').value;
    var printer = this.getPrinterById(printerId);
    this.printProduct(productId,printer);
  }

  clearProductInformation(printerId,keepVisible)
  {
    var productInformation = document.getElementById(printerId).querySelector('.printer-status').querySelector('.printer-status-row').querySelector('.printer-control').querySelector('.product-info');

    if (!keepVisible)
    {
      productInformation.classList.add('hidden');
    }

    while (productInformation.firstChild)
    {
      productInformation.firstChild.remove();
    }
  }

  updateProductInformation(printerId,productId)
  {
    var productInformation = document.getElementById(printerId).querySelector('.printer-status').querySelector('.printer-status-row').querySelector('.printer-control').querySelector('.product-info');
    productInformation.classList.remove('hidden');

    this.clearProductInformation(printerId,true);

    var product = {...this.allProducts[productId]};
    var printer = this.getPrinterById(printerId);

    var productInformationTitle = document.createElement('h5');
    productInformationTitle.className = 'product-info-title';
    productInformationTitle.innerHTML = product.name;

    productInformation.appendChild(productInformationTitle);

    var information = [
      {
        name:"Print Time: ",
        value:product.printTime*printer.speedMultiplier+' minutes',
        classList:['can-afford'],
      },
      {
        name:"Selling Price: ",
        value:'$'+product.sellingPrice*printer.qualityMultiplier,
        classList:['can-afford'],
      },
      {
        name:"Filament Needed: ",
        value:product.filamentGrams+"g "+product.filament,
        classList:[(this.variables.filament.hasOwnProperty(product.filament) && this.variables.filament[product.filament].grams >= product.filamentGrams) ? 'can-afford' : 'no-afford'],
      },
      {
        name:"Filament Cost: ",
        value:'$'+(this.allFilaments[product.filament].costPerSpool/this.gramsPerSpool)*product.filamentGrams,
        classList:['can-afford'],
      }
    ];

    for (var data of information)
    {
      var informationText = document.createElement('li');
      informationText.innerHTML = data.name+"<span class=\"product-info-value "+data.classList.join(' ')+"\">"+data.value+"</span>";
      informationText.className = 'product-info-text';

      productInformation.appendChild(informationText);
    }
  }

  getPrinterById(printerId)
  {
    for (var printer of this.variables.printers)
    {
      if (printer.id == printerId)
      {
        return printer;
      }
    }
  }

  getPercent(percent)
  {
    return "%"+percent/1;
  }

  resetVariables()
  {
    this.variables = JSON.parse(this.cookies.get("variables").replace("variables=",""));
  }

  updateVariables()
  {
    this.cookies.set("variables",JSON.stringify(this.variables));
  }
}
