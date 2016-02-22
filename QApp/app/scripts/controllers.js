/**
 * Created by Admin on 18/02/2016.
 */
'use strict';

/**
 * @ngdoc function
 * @name preventivitoreAppApp.controller:controllers
 * @description
 * # MainCtrl
 * # AboutCtrl
 * # ContactCtrl
 * # LandingCtrl
 * Controllers of the preventivitoreApp
 */
(function() {

  var reprocessedJSON = [];

  function MainCtrl(){
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }

  function AboutCtrl(){
    this.message = 'This is the about view';
  }

  function ContactCtrl(){
    this.message = 'This is the contact view';
  }

  function LandingCtrl(QuestionarioService, $scope){

    this.backendValue = [];
    $scope.error = '';
    $scope.bValue = [];
    $scope.numeroCariches = [];
    $scope.massimale = [];
    $scope.dataDecorrenza = [];
    $scope.fields = [];
    $scope.field = [];

    function keyValuePair(key, value){
      var pair = {};
      var pairs = [];
      for(var i = 0; i < key.length; i++){
        pair = {k:key[i], v:value[i]};
        pairs.push(pair);
      }
      return pairs;
    }

    function formatIdVariabile(s) {
      return s.split(/(?=[A-Z])/).map(function(p) {
        return p.charAt(0).toUpperCase() + p.slice(1);
      }).join(' ');
    }


    function getNestedChildren(arr) {
      var out = [];
      var temp = [];
      var children = [];
      var a = {};
      var j = 0;
      //var arrs = [{'idVariabile':'numeroCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10'],'descr':['1','2','3','4','5','6','7','8','9','10']},'help':null,'classeVariabile':null},{'idVariabile':'massimale','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['500000','1000000','1500000','2500000','5000000','7000000','10000000'],'descr':['500000','1000000','1500000','2500000','5000000','7000000','10000000']},'help':null,'classeVariabile':null},{'idVariabile':'enteCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA','tipoVariabile':{'tipologia':'COMPLESSO','listaVariabili':[{'idVariabile':'carica','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['A','B','C','D','E','F','G','H'],'descr':['Dirigenti Tecnici/Dirigenti Legali iscritti allalbo speciale/Alte professionalit /collaudatore tecnico-amministrativo/commissario ad acta','Organo di vertice/Commissario straordinario/Amministratore Unico/Prefetto','Posizioni organizzative Tecniche/Rup tecnici/altri dipendenti tecnici e collaboratori tecnici in genere/Direttore Esecuzione Contratto','Altri organi/Tesoriere','Dirigenti Amministrativi/Attivit  specifiche/Rup non tecnico/Membri dellEsercito e Forze Armate/Componente Nucleo di Valutazione/Membri Organismo di vigilanza/componente Organismo Indipendente di Valutazione','Altri Amministratori/Assessori/Membri CdA','Posizioni Organizzative Amministrative e altri dipendenti amministrativi/Educatore/Coordinatore Serv.Personale','Componenti di altri organi collegiali e altre specifiche professionalitÃ ']},'help':null,'classeVariabile':null},{'idVariabile':'ente','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'],'descr':['Comuni/Unioni di Comuni/Associazioni di Comuni/ComunitÃ  montane','Province/CittÃ  metropolitane','Regioni','Ospedali/Case di ri/poso/Fondazioni ospedaliere','ASL/ASP_Azienda Sanitaria Provinciale/ARPA/IPAB','Camere di Commercio','AutoritÃ  Garante','Ministeri/Agenzia delle Entrate/Tribunale/Monopoli di Stato/Genio Civile/Forze Armate/Esercito/Marina Militare/Aifa/Miur/CRI/Cndcec/Anci/Inps/Inail/Altre Amministrazioni Statali','UniversitÃ /Istituti scolastici pubblici e scuole pubbliche in genere/ADISU','Porti AutoritÃ  Portuali','ASP-Azienda servizi alla persona/ATER/ALER/ATC/ACER','Consorzi Vari/Magistrato Acque/Parchi','AATO','Enti Strumentali (enti dotati e non dotati di personalitÃ  giuridica)/Farmacie/Aziende Speciali/AFOL','Organismi di Diritto Pubblico e SocietÃ  a partecipazione pubblica','Organismi di Diritto Pubblico e SocietÃ  a Partecipazione pubblica']},'help':null,'classeVariabile':null}]}},'help':null,'classeVariabile':null},{'idVariabile':'sinistriPregressi','obbligatoria':false,'tipoVariabile':{'tipologia':'BOOLEANO'},'help':null,'classeVariabile':null},{'idVariabile':'dataDecorrenza','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['31/12/2015','31/03/2016','30/06/2016'],'descr':['31/12/2015','31/03/2016','30/06/2016']},'help':null,'classeVariabile':null}];
      for(var i in arr) {
        //console.log(JSON.stringify(arr[i].tipoVariabile.tipologia));
        //a = arr[i].tipoVariabile.tipologia;
        console.log(arr[i].tipoVariabile);
        //console.log(JSON.parse(Array.isArray(arr[i].tipoVariabile)))
        if(arr[i].tipoVariabile === 'LISTA') {
          j++;
          children = getNestedChildren(arr[i].tipoVariabile.tipoVariabile);
          if(children.length > 0){
            out.push(arr[i]);
            continue;
          }
        }else{
          out.push(arr[i]);
        }
      }
      console.log(JSON.stringify(out));
      //$scope.field = out;
      return out;
    }


    var onSuccess = function(data) {
      //this.backendValue = data;
      $scope.bValue = data;
      $scope.numeroCariches = keyValuePair(data[0].tipoVariabile.values, data[0].tipoVariabile.descr);
      $scope.massimale = keyValuePair(data[1].tipoVariabile.values, data[1].tipoVariabile.descr);
      $scope.enteCariche = data[2].tipoVariabile.tipoVariabile.listaVariabili;
      //$scope.numeroCariche = data[3];
      $scope.dataDecorrenza = keyValuePair(data[4].tipoVariabile.values, data[4].tipoVariabile.descr);

      var dat = [{'idVariabile':'numeroCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10'],'descr':['1','2','3','4','5','6','7','8','9','10']},'help':null,'classeVariabile':null},{'idVariabile':'massimale','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['500000','1000000','1500000','2500000','5000000','7000000','10000000'],'descr':['500000','1000000','1500000','2500000','5000000','7000000','10000000']},'help':null,'classeVariabile':null},{'idVariabile':'enteCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA','tipoVariabile':{'tipologia':'COMPLESSO','listaVariabili':[{'idVariabile':'carica','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['A','B','C','D','E','F','G','H'],'descr':['Dirigenti Tecnici/Dirigenti Legali iscritti allalbo speciale/Alte professionalit /collaudatore tecnico-amministrativo/commissario ad acta','Organo di vertice/Commissario straordinario/Amministratore Unico/Prefetto','Posizioni organizzative Tecniche/Rup tecnici/altri dipendenti tecnici e collaboratori tecnici in genere/Direttore Esecuzione Contratto','Altri organi/Tesoriere','Dirigenti Amministrativi/Attivit  specifiche/Rup non tecnico/Membri dellEsercito e Forze Armate/Componente Nucleo di Valutazione/Membri Organismo di vigilanza/componente Organismo Indipendente di Valutazione','Altri Amministratori/Assessori/Membri CdA','Posizioni Organizzative Amministrative e altri dipendenti amministrativi/Educatore/Coordinatore Serv.Personale','Componenti di altri organi collegiali e altre specifiche professionalitÃ ']},'help':null,'classeVariabile':null},{'idVariabile':'ente','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'],'descr':['Comuni/Unioni di Comuni/Associazioni di Comuni/ComunitÃ  montane','Province/CittÃ  metropolitane','Regioni','Ospedali/Case di ri/poso/Fondazioni ospedaliere','ASL/ASP_Azienda Sanitaria Provinciale/ARPA/IPAB','Camere di Commercio','AutoritÃ  Garante','Ministeri/Agenzia delle Entrate/Tribunale/Monopoli di Stato/Genio Civile/Forze Armate/Esercito/Marina Militare/Aifa/Miur/CRI/Cndcec/Anci/Inps/Inail/Altre Amministrazioni Statali','UniversitÃ /Istituti scolastici pubblici e scuole pubbliche in genere/ADISU','Porti AutoritÃ  Portuali','ASP-Azienda servizi alla persona/ATER/ALER/ATC/ACER','Consorzi Vari/Magistrato Acque/Parchi','AATO','Enti Strumentali (enti dotati e non dotati di personalitÃ  giuridica)/Farmacie/Aziende Speciali/AFOL','Organismi di Diritto Pubblico e SocietÃ  a partecipazione pubblica','Organismi di Diritto Pubblico e SocietÃ  a Partecipazione pubblica']},'help':null,'classeVariabile':null}]}},'help':null,'classeVariabile':null},{'idVariabile':'sinistriPregressi','obbligatoria':false,'tipoVariabile':{'tipologia':'BOOLEANO'},'help':null,'classeVariabile':null},{'idVariabile':'dataDecorrenza','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['31/12/2015','31/03/2016','30/06/2016'],'descr':['31/12/2015','31/03/2016','30/06/2016']},'help':null,'classeVariabile':null}];
      $scope.field = getNestedChildren(dat);
      var row = {};
      var rows = [];
      for(var j = 0; j < $scope.field.length; j++){
        row  = {idVariabile: formatIdVariabile(data[j].idVariabile), obbligatoria: data[j].obbligatoria, help: data[j].help, classeVariablile: data[j].classeVariabile,
        model: data[j].idVariabile, maxLength: '25', minValue: '1', maxValue: '500'};
        rows.push(row);
      }

      console.log(JSON.stringify(rows));

      //console.log(JSON.stringify($scope.field));
    };

    var onError = function(reason) {
      this.error = reason;
    };

    function loadBackEnd(){
      var data = [{'idVariabile':'numeroCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10'],'descr':['1','2','3','4','5','6','7','8','9','10']},'help':null,'classeVariabile':null},{'idVariabile':'massimale','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['500000','1000000','1500000','2500000','5000000','7000000','10000000'],'descr':['500000','1000000','1500000','2500000','5000000','7000000','10000000']},'help':null,'classeVariabile':null},{'idVariabile':'enteCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA','tipoVariabile':{'tipologia':'COMPLESSO','listaVariabili':[{'idVariabile':'carica','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['A','B','C','D','E','F','G','H'],'descr':['Dirigenti Tecnici/Dirigenti Legali iscritti allalbo speciale/Alte professionalit /collaudatore tecnico-amministrativo/commissario ad acta','Organo di vertice/Commissario straordinario/Amministratore Unico/Prefetto','Posizioni organizzative Tecniche/Rup tecnici/altri dipendenti tecnici e collaboratori tecnici in genere/Direttore Esecuzione Contratto','Altri organi/Tesoriere','Dirigenti Amministrativi/Attivit  specifiche/Rup non tecnico/Membri dellEsercito e Forze Armate/Componente Nucleo di Valutazione/Membri Organismo di vigilanza/componente Organismo Indipendente di Valutazione','Altri Amministratori/Assessori/Membri CdA','Posizioni Organizzative Amministrative e altri dipendenti amministrativi/Educatore/Coordinatore Serv.Personale','Componenti di altri organi collegiali e altre specifiche professionalitÃ ']},'help':null,'classeVariabile':null},{'idVariabile':'ente','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'],'descr':['Comuni/Unioni di Comuni/Associazioni di Comuni/ComunitÃ  montane','Province/CittÃ  metropolitane','Regioni','Ospedali/Case di ri/poso/Fondazioni ospedaliere','ASL/ASP_Azienda Sanitaria Provinciale/ARPA/IPAB','Camere di Commercio','AutoritÃ  Garante','Ministeri/Agenzia delle Entrate/Tribunale/Monopoli di Stato/Genio Civile/Forze Armate/Esercito/Marina Militare/Aifa/Miur/CRI/Cndcec/Anci/Inps/Inail/Altre Amministrazioni Statali','UniversitÃ /Istituti scolastici pubblici e scuole pubbliche in genere/ADISU','Porti AutoritÃ  Portuali','ASP-Azienda servizi alla persona/ATER/ALER/ATC/ACER','Consorzi Vari/Magistrato Acque/Parchi','AATO','Enti Strumentali (enti dotati e non dotati di personalitÃ  giuridica)/Farmacie/Aziende Speciali/AFOL','Organismi di Diritto Pubblico e SocietÃ  a partecipazione pubblica','Organismi di Diritto Pubblico e SocietÃ  a Partecipazione pubblica']},'help':null,'classeVariabile':null}]}},'help':null,'classeVariabile':null},{'idVariabile':'sinistriPregressi','obbligatoria':false,'tipoVariabile':{'tipologia':'BOOLEANO'},'help':null,'classeVariabile':null},{'idVariabile':'dataDecorrenza','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['31/12/2015','31/03/2016','30/06/2016'],'descr':['31/12/2015','31/03/2016','30/06/2016']},'help':null,'classeVariabile':null}];
      //QuestionarioService.getQuestionarioParameters().then(onSuccess, onError);
      onSuccess(data);
    }

    loadBackEnd();

  }



  function ExampleCtrl($scope) {

    function formatIdVariabile(s) {
      return s.split(/(?=[A-Z])/).map(function(p) {
        return p.charAt(0).toUpperCase() + p.slice(1);
      }).join(' ');
    }

    function keyValuePairz(key, value){
      console.log(key);
      var pair = {};
      var pairs = [];
      for(var i in key){
        pair = {caption:key[i], value:value[i]};
        pairs.push(pair);

      }
      return pairs;
    }

    function getNestedChildren(arr) {
      var out = [];
      var temp = [];
      var children = [];
      var a = {};
      var j = 0;
      //var arrs = [{'idVariabile':'numeroCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10'],'descr':['1','2','3','4','5','6','7','8','9','10']},'help':null,'classeVariabile':null},{'idVariabile':'massimale','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['500000','1000000','1500000','2500000','5000000','7000000','10000000'],'descr':['500000','1000000','1500000','2500000','5000000','7000000','10000000']},'help':null,'classeVariabile':null},{'idVariabile':'enteCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA','tipoVariabile':{'tipologia':'COMPLESSO','listaVariabili':[{'idVariabile':'carica','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['A','B','C','D','E','F','G','H'],'descr':['Dirigenti Tecnici/Dirigenti Legali iscritti allalbo speciale/Alte professionalit /collaudatore tecnico-amministrativo/commissario ad acta','Organo di vertice/Commissario straordinario/Amministratore Unico/Prefetto','Posizioni organizzative Tecniche/Rup tecnici/altri dipendenti tecnici e collaboratori tecnici in genere/Direttore Esecuzione Contratto','Altri organi/Tesoriere','Dirigenti Amministrativi/Attivit  specifiche/Rup non tecnico/Membri dellEsercito e Forze Armate/Componente Nucleo di Valutazione/Membri Organismo di vigilanza/componente Organismo Indipendente di Valutazione','Altri Amministratori/Assessori/Membri CdA','Posizioni Organizzative Amministrative e altri dipendenti amministrativi/Educatore/Coordinatore Serv.Personale','Componenti di altri organi collegiali e altre specifiche professionalitÃ ']},'help':null,'classeVariabile':null},{'idVariabile':'ente','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'],'descr':['Comuni/Unioni di Comuni/Associazioni di Comuni/ComunitÃ  montane','Province/CittÃ  metropolitane','Regioni','Ospedali/Case di ri/poso/Fondazioni ospedaliere','ASL/ASP_Azienda Sanitaria Provinciale/ARPA/IPAB','Camere di Commercio','AutoritÃ  Garante','Ministeri/Agenzia delle Entrate/Tribunale/Monopoli di Stato/Genio Civile/Forze Armate/Esercito/Marina Militare/Aifa/Miur/CRI/Cndcec/Anci/Inps/Inail/Altre Amministrazioni Statali','UniversitÃ /Istituti scolastici pubblici e scuole pubbliche in genere/ADISU','Porti AutoritÃ  Portuali','ASP-Azienda servizi alla persona/ATER/ALER/ATC/ACER','Consorzi Vari/Magistrato Acque/Parchi','AATO','Enti Strumentali (enti dotati e non dotati di personalitÃ  giuridica)/Farmacie/Aziende Speciali/AFOL','Organismi di Diritto Pubblico e SocietÃ  a partecipazione pubblica','Organismi di Diritto Pubblico e SocietÃ  a Partecipazione pubblica']},'help':null,'classeVariabile':null}]}},'help':null,'classeVariabile':null},{'idVariabile':'sinistriPregressi','obbligatoria':false,'tipoVariabile':{'tipologia':'BOOLEANO'},'help':null,'classeVariabile':null},{'idVariabile':'dataDecorrenza','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['31/12/2015','31/03/2016','30/06/2016'],'descr':['31/12/2015','31/03/2016','30/06/2016']},'help':null,'classeVariabile':null}];
      for(var i in arr) {
        //console.log(arr[i].tipoVariabile['tipologia']);
        //console.log(arr[i].tipoVariabile['tipoVariabile']);

        //console.log(JSON.parse(Array.isArray(arr[i].tipoVariabile)))
        if(arr[i].hasOwnProperty(arr[i].tipoVariabile['tipologia']) && arr[i].tipoVariabile['tipologia'] === 'LISTA') {
          j++;
          //a = arr[i].tipoVariabile['tipoVariabile'];
          //console.log(arr[i].tipoVariabile['tipoVariabile'].listaVariabili);
          //children = getNestedChildren(arr[i].tipoVariabile.tipoVariabile);
          for(var x in arr[i].tipoVariabile['tipoVariabile'].listaVariabili){
            getNestedChildren(arr[i].tipoVariabile['tipoVariabile'].listaVariabili(x));
          }
        }else{
          out.push(arr[i]);
        }
      }
      console.log(JSON.stringify(out));
      console.log(JSON.stringify(j));
      //$scope.field = out;
      return out;
    }

    var dat = [{'idVariabile':'numeroCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10'],'descr':['1','2','3','4','5','6','7','8','9','10']},'help':null,'classeVariabile':null},{'idVariabile':'massimale','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['500000','1000000','1500000','2500000','5000000','7000000','10000000'],'descr':['500000','1000000','1500000','2500000','5000000','7000000','10000000']},'help':null,'classeVariabile':null},{'idVariabile':'enteCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA','tipoVariabile':{'tipologia':'COMPLESSO','listaVariabili':[{'idVariabile':'carica','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['A','B','C','D','E','F','G','H'],'descr':['Dirigenti Tecnici/Dirigenti Legali iscritti allalbo speciale/Alte professionalit /collaudatore tecnico-amministrativo/commissario ad acta','Organo di vertice/Commissario straordinario/Amministratore Unico/Prefetto','Posizioni organizzative Tecniche/Rup tecnici/altri dipendenti tecnici e collaboratori tecnici in genere/Direttore Esecuzione Contratto','Altri organi/Tesoriere','Dirigenti Amministrativi/Attivit  specifiche/Rup non tecnico/Membri dellEsercito e Forze Armate/Componente Nucleo di Valutazione/Membri Organismo di vigilanza/componente Organismo Indipendente di Valutazione','Altri Amministratori/Assessori/Membri CdA','Posizioni Organizzative Amministrative e altri dipendenti amministrativi/Educatore/Coordinatore Serv.Personale','Componenti di altri organi collegiali e altre specifiche professionalitÃ ']},'help':null,'classeVariabile':null},{'idVariabile':'ente','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'],'descr':['Comuni/Unioni di Comuni/Associazioni di Comuni/ComunitÃ  montane','Province/CittÃ  metropolitane','Regioni','Ospedali/Case di ri/poso/Fondazioni ospedaliere','ASL/ASP_Azienda Sanitaria Provinciale/ARPA/IPAB','Camere di Commercio','AutoritÃ  Garante','Ministeri/Agenzia delle Entrate/Tribunale/Monopoli di Stato/Genio Civile/Forze Armate/Esercito/Marina Militare/Aifa/Miur/CRI/Cndcec/Anci/Inps/Inail/Altre Amministrazioni Statali','UniversitÃ /Istituti scolastici pubblici e scuole pubbliche in genere/ADISU','Porti AutoritÃ  Portuali','ASP-Azienda servizi alla persona/ATER/ALER/ATC/ACER','Consorzi Vari/Magistrato Acque/Parchi','AATO','Enti Strumentali (enti dotati e non dotati di personalitÃ  giuridica)/Farmacie/Aziende Speciali/AFOL','Organismi di Diritto Pubblico e SocietÃ  a partecipazione pubblica','Organismi di Diritto Pubblico e SocietÃ  a Partecipazione pubblica']},'help':null,'classeVariabile':null}]}},'help':null,'classeVariabile':null},{'idVariabile':'sinistriPregressi','obbligatoria':false,'tipoVariabile':{'tipologia':'BOOLEANO'},'help':null,'classeVariabile':null},{'idVariabile':'dataDecorrenza','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['31/12/2015','31/03/2016','30/06/2016'],'descr':['31/12/2015','31/03/2016','30/06/2016']},'help':null,'classeVariabile':null}];
    //var dat = [{'idVariabile':'numeroCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10'],'descr':['1','2','3','4','5','6','7','8','9','10']},'help':null,'classeVariabile':null},{'idVariabile':'massimale','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['500000','1000000','1500000','2500000','5000000','7000000','10000000'],'descr':['500000','1000000','1500000','2500000','5000000','7000000','10000000']},'help':null,'classeVariabile':null},{'idVariabile':'sinistriPregressi','obbligatoria':false,'tipoVariabile':{'tipologia':'BOOLEANO'},'help':null,'classeVariabile':null},{'idVariabile':'dataDecorrenza','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['31/12/2015','31/03/2016','30/06/2016'],'descr':['31/12/2015','31/03/2016','30/06/2016']},'help':null,'classeVariabile':null}];
    $scope.field = getNestedChildren(dat);
    var row = {};
    var rows = [];
    var inputType = '';
    for(var j = 0; j < $scope.field.length; j++){
      if($scope.field[j].tipoVariabile.tipologia === 'LISTA_VALORI'){
        inputType = 'select';
      }else if($scope.field[j].tipoVariabile.tipologia === 'INTEGER'){
        inputType = 'integer';
      }else if($scope.field[j].tipoVariabile.tipologia === 'DATE'){
        inputType = 'date';
      }else if($scope.field[j].tipoVariabile.tipologia === 'BOOLEANO'){
        inputType = 'radio';
      }else {
        inputType = 'select';
      }

      row  = {idVariabile: formatIdVariabile($scope.field[j].idVariabile), tipologia: inputType, obbligatoria: $scope.field[j].obbligatoria, help: $scope.field[j].help, classeVariablile: $scope.field[j].classeVariabile,
        model: $scope.field[j].idVariabile, maxLength: '25', minValue: '1', maxValue: '500',
        options: keyValuePairz($scope.field[j].tipoVariabile.values, $scope.field[j].tipoVariabile.descr)};
      rows.push(row);
    }
    $scope.fields = rows;
    console.log(JSON.stringify(rows));
    $scope.fieldsxx = [
      {
        idVariabile: 'Name',
        model: 'name',
        tipologia: 'string',
        maxLength: 25
      },
      {
        idVariabile: 'Date of Birth',
        model: 'dateOfBirth',
        tipologia: 'date'
      },
      {
        idVariabile: 'Street Address',
        model: 'address.street',
        tipologia: 'string',
        maxLength: 25
      },
      {
        idVariabile: 'City',
        model: 'address.city',
        tipologia: 'string',
        maxLength: 25
      },
      {
        idVariabile: 'State',
        model: 'address.state',
        tipologia: 'select',
        options: [
          {
            caption: 'California',
            value: 'CA'
          },
          {
            caption: 'New York',
            value: 'NY'
          },
          {
            caption: 'Torino',
            value: 'TO'
          },
          {
            caption: 'Washington',
            value: 'WA'
          }
        ]
      },
      {
        idVariabile: 'Zip Code',
        model: 'address.zipCode',
        tipologia: 'integer',
        maxLength: 5,
        minValue: 10000,
        maxValue: 99999
      },
      {
        idVariabile: 'Nicknames',
        model: 'nicknames',
        tipologia: 'array<string>'
      }
    ];

    $scope.data = {
      name: 'John Smith',
      address: {}
    };
  }

  function formatIdVariabilezz(s) {
    return s.split(/(?=[A-Z])/).map(function(p) {
      return p.charAt(0).toUpperCase() + p.slice(1);
    }).join(' ');
  }

  function keyValuePairzz(key, value){
    //console.log(key);
    var pair = {};
    var pairs = [];
    //pair = {value:"", name:"Select One"};
    //pairs.push(pair);
    for(var i in key){
      pair = {value:key[i], name:value[i]};
      pairs.push(pair);

    }
    return pairs;
  }

  function getNestedChildrenzz(arr, head) {
    var out = [];
    var j = 0;
    //var arrs = [{'idVariabile':'numeroCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10'],'descr':['1','2','3','4','5','6','7','8','9','10']},'help':null,'classeVariabile':null},{'idVariabile':'massimale','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['500000','1000000','1500000','2500000','5000000','7000000','10000000'],'descr':['500000','1000000','1500000','2500000','5000000','7000000','10000000']},'help':null,'classeVariabile':null},{'idVariabile':'enteCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA','tipoVariabile':{'tipologia':'COMPLESSO','listaVariabili':[{'idVariabile':'carica','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['A','B','C','D','E','F','G','H'],'descr':['Dirigenti Tecnici/Dirigenti Legali iscritti allalbo speciale/Alte professionalit /collaudatore tecnico-amministrativo/commissario ad acta','Organo di vertice/Commissario straordinario/Amministratore Unico/Prefetto','Posizioni organizzative Tecniche/Rup tecnici/altri dipendenti tecnici e collaboratori tecnici in genere/Direttore Esecuzione Contratto','Altri organi/Tesoriere','Dirigenti Amministrativi/Attivit  specifiche/Rup non tecnico/Membri dellEsercito e Forze Armate/Componente Nucleo di Valutazione/Membri Organismo di vigilanza/componente Organismo Indipendente di Valutazione','Altri Amministratori/Assessori/Membri CdA','Posizioni Organizzative Amministrative e altri dipendenti amministrativi/Educatore/Coordinatore Serv.Personale','Componenti di altri organi collegiali e altre specifiche professionalitÃ ']},'help':null,'classeVariabile':null},{'idVariabile':'ente','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'],'descr':['Comuni/Unioni di Comuni/Associazioni di Comuni/ComunitÃ  montane','Province/CittÃ  metropolitane','Regioni','Ospedali/Case di ri/poso/Fondazioni ospedaliere','ASL/ASP_Azienda Sanitaria Provinciale/ARPA/IPAB','Camere di Commercio','AutoritÃ  Garante','Ministeri/Agenzia delle Entrate/Tribunale/Monopoli di Stato/Genio Civile/Forze Armate/Esercito/Marina Militare/Aifa/Miur/CRI/Cndcec/Anci/Inps/Inail/Altre Amministrazioni Statali','UniversitÃ /Istituti scolastici pubblici e scuole pubbliche in genere/ADISU','Porti AutoritÃ  Portuali','ASP-Azienda servizi alla persona/ATER/ALER/ATC/ACER','Consorzi Vari/Magistrato Acque/Parchi','AATO','Enti Strumentali (enti dotati e non dotati di personalitÃ  giuridica)/Farmacie/Aziende Speciali/AFOL','Organismi di Diritto Pubblico e SocietÃ  a partecipazione pubblica','Organismi di Diritto Pubblico e SocietÃ  a Partecipazione pubblica']},'help':null,'classeVariabile':null}]}},'help':null,'classeVariabile':null},{'idVariabile':'sinistriPregressi','obbligatoria':false,'tipoVariabile':{'tipologia':'BOOLEANO'},'help':null,'classeVariabile':null},{'idVariabile':'dataDecorrenza','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['31/12/2015','31/03/2016','30/06/2016'],'descr':['31/12/2015','31/03/2016','30/06/2016']},'help':null,'classeVariabile':null}];
    for(var i in arr) {
      //console.log(arr[i].tipoVariabile);
      //console.log(arr[i].tipoVariabile['tipoVariabile']);

      //console.log(JSON.parse(Array.isArray(arr[i].tipoVariabile)))
      if(typeof(arr[i].tipoVariabile['tipologia']) !== 'undefined' && arr[i].tipoVariabile['tipologia'] === 'LISTA') {
        j++;
        //console.log('1: ' + arr[i].tipoVariabile['tipologia']);
        //console.log(arr[i].tipoVariabile['tipoVariabile'].listaVariabili);
        //children = getNestedChildren(arr[i].tipoVariabile.tipoVariabile);

        if(typeof(arr[i].tipoVariabile['tipoVariabile'].tipologia) !== 'undefined' && arr[i].tipoVariabile['tipoVariabile'].tipologia === 'COMPLESSO') {
          //console.log('2: ' + arr[i].tipoVariabile['tipoVariabile'].tipologia);
          if(typeof(arr[i].tipoVariabile['tipoVariabile'].listaVariabili) !== 'undefined') {
            //console.log('3: ' + JSON.stringify(arr[i].tipoVariabile['tipoVariabile'].listaVariabili));
            /*for (var x in arr[i].tipoVariabile['tipoVariabile'].listaVariabili) {
              console.log('Recursive Point...: ' + JSON.stringify(x) + ', ' + JSON.stringify(arr[i].tipoVariabile['tipoVariabile'].listaVariabili[x]));
              //getNestedChildrenzz(arr[i].tipoVariabile['tipoVariabile'].listaVariabili[x]);
            }*/
            getNestedChildrenzz(arr[i].tipoVariabile['tipoVariabile'].listaVariabili, arr[i].idVariabile);
          }
        }
      }else{
        if(head === null){
          arr[i].rootHeader = arr[i].idVariabile;
        }else{
          arr[i].rootHeader = head;
        }
        reprocessedJSON.push(arr[i]);
      }
    }
    //console.log('out: ' + JSON.stringify(reprocessedJSON));
    //console.log(JSON.stringify(j));
    //$scope.field = out;
    //return reprocessedJSON;
  }

  function schemaInputTypeMapping(fieldLocal){

    if(fieldLocal === 'LISTA_VALORI'){
      return 'string'; //'select';
    }else if(fieldLocal === 'INTEGER'){
      return 'number';
    }else if(fieldLocal === 'DATE'){
      return 'date';
    }else if(fieldLocal === 'BOOLEANO'){
      return 'string'; //'radio';
    }else {
      return 'string';
    }
  }

  function formInputTypeMapping(fieldLocal){

    if(fieldLocal === 'LISTA_VALORI'){
      return 'select';
    }else if(fieldLocal === 'BOOLEANO'){
      return 'radios';
    }else {
      return 'string';
    }
  }

  function FormController($scope) {

    reprocessedJSON = [];
    $scope.model = {};

    console.log('FormController');

    var dat = [{'idVariabile':'numeroCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10'],'descr':['1','2','3','4','5','6','7','8','9','10']},'help':null,'classeVariabile':null},{'idVariabile':'massimale','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['500000','1000000','1500000','2500000','5000000','7000000','10000000'],'descr':['500000','1000000','1500000','2500000','5000000','7000000','10000000']},'help':null,'classeVariabile':null},{'idVariabile':'enteCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA','tipoVariabile':{'tipologia':'COMPLESSO','listaVariabili':[{'idVariabile':'carica','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['A','B','C','D','E','F','G','H'],'descr':['Dirigenti Tecnici/Dirigenti Legali iscritti allalbo speciale/Alte professionalit /collaudatore tecnico-amministrativo/commissario ad acta','Organo di vertice/Commissario straordinario/Amministratore Unico/Prefetto','Posizioni organizzative Tecniche/Rup tecnici/altri dipendenti tecnici e collaboratori tecnici in genere/Direttore Esecuzione Contratto','Altri organi/Tesoriere','Dirigenti Amministrativi/Attivit  specifiche/Rup non tecnico/Membri dellEsercito e Forze Armate/Componente Nucleo di Valutazione/Membri Organismo di vigilanza/componente Organismo Indipendente di Valutazione','Altri Amministratori/Assessori/Membri CdA','Posizioni Organizzative Amministrative e altri dipendenti amministrativi/Educatore/Coordinatore Serv.Personale','Componenti di altri organi collegiali e altre specifiche professionalitÃ ']},'help':null,'classeVariabile':null},{'idVariabile':'ente','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'],'descr':['Comuni/Unioni di Comuni/Associazioni di Comuni/ComunitÃ  montane','Province/CittÃ  metropolitane','Regioni','Ospedali/Case di ri/poso/Fondazioni ospedaliere','ASL/ASP_Azienda Sanitaria Provinciale/ARPA/IPAB','Camere di Commercio','AutoritÃ  Garante','Ministeri/Agenzia delle Entrate/Tribunale/Monopoli di Stato/Genio Civile/Forze Armate/Esercito/Marina Militare/Aifa/Miur/CRI/Cndcec/Anci/Inps/Inail/Altre Amministrazioni Statali','UniversitÃ /Istituti scolastici pubblici e scuole pubbliche in genere/ADISU','Porti AutoritÃ  Portuali','ASP-Azienda servizi alla persona/ATER/ALER/ATC/ACER','Consorzi Vari/Magistrato Acque/Parchi','AATO','Enti Strumentali (enti dotati e non dotati di personalitÃ  giuridica)/Farmacie/Aziende Speciali/AFOL','Organismi di Diritto Pubblico e SocietÃ  a partecipazione pubblica','Organismi di Diritto Pubblico e SocietÃ  a Partecipazione pubblica']},'help':null,'classeVariabile':null}]}},'help':null,'classeVariabile':null},{'idVariabile':'sinistriPregressi','obbligatoria':false,'tipoVariabile':{'tipologia':'BOOLEANO'},'help':null,'classeVariabile':null},{'idVariabile':'dataDecorrenza','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['31/12/2015','31/03/2016','30/06/2016'],'descr':['31/12/2015','31/03/2016','30/06/2016']},'help':null,'classeVariabile':null}];
    //var dat = [{'idVariabile':'numeroCariche','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['1','2','3','4','5','6','7','8','9','10'],'descr':['1','2','3','4','5','6','7','8','9','10']},'help':null,'classeVariabile':null},{'idVariabile':'massimale','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['500000','1000000','1500000','2500000','5000000','7000000','10000000'],'descr':['500000','1000000','1500000','2500000','5000000','7000000','10000000']},'help':null,'classeVariabile':null},{'idVariabile':'sinistriPregressi','obbligatoria':false,'tipoVariabile':{'tipologia':'BOOLEANO'},'help':null,'classeVariabile':null},{'idVariabile':'dataDecorrenza','obbligatoria':false,'tipoVariabile':{'tipologia':'LISTA_VALORI','values':['31/12/2015','31/03/2016','30/06/2016'],'descr':['31/12/2015','31/03/2016','30/06/2016']},'help':null,'classeVariabile':null}];
    getNestedChildrenzz(dat, null);
    function formInputSchema(data) {

      console.log('reprocessedJSON: ' + JSON.stringify(reprocessedJSON));

      $scope.field = data;
      //console.log('$scope.field: ' + JSON.stringify($scope.field));

      var formRow = {};
      var schemaRows = {type: "object", properties: {}, required: []};
      var formRows = [];
      var schemaInputType = '';
      var formInputType = '';
      //console.log('$scope.field.len: ' + $scope.field.length);
      for (var j = 0; j < $scope.field.length; j++) {
        $scope.model[$scope.field[j].idVariabile] = 'N/A';
        schemaInputType = schemaInputTypeMapping($scope.field[j].tipoVariabile.tipologia);

        schemaRows.properties[$scope.field[j].idVariabile] = {type: schemaInputType,
            title: formatIdVariabilezz($scope.field[j].idVariabile)
        };

        schemaRows.required.push($scope.field[j].idVariabile);

        if($scope.field[j].tipoVariabile.tipologia === 'LISTA_VALORI' || $scope.field[j].tipoVariabile.tipologia === 'BOOLEANO'){
          formInputType = formInputTypeMapping($scope.field[j].tipoVariabile.tipologia);
          formRow = {
            key: $scope.field[j].idVariabile,
            type: formInputType
          };
          if(formInputType === 'select'){
              formRow.titleMap = keyValuePairzz($scope.field[j].tipoVariabile.values, $scope.field[j].tipoVariabile.descr);
          }else if(formInputType === 'radios'){
            formRow.titleMap = [{ value: "0", name: "No" }, { value: "1", name: "Yes" }];
          }
          formRows.push(formRow);
        }else{
          formRows.push($scope.field[j].idVariabile);
        }

      }
      var submitBtn = {type: "submit", style: "btn-info",  title: "Calculate" };
      formRows.push(submitBtn);

      $scope.schema = schemaRows;
      $scope.form = formRows;
      //console.log('schemaRows: ' + JSON.stringify(schemaRows));
      //console.log('formRows: ' + JSON.stringify(formRows));
    }

    formInputSchema(reprocessedJSON);

    /*$scope.schema = {
      type: "object",
      properties: {
        "name": {
          type: "string",
          title: "Name",
          minLength: 2,
          description: "Name or alias"
        },
        "title": {
          type: "string",
          title: "Title",
          enum: ['Dr','Jr','Sir','Mrs','Mr','NaN','Dj','Prof']
        },
        "noenum": {
          type: "string",
          title: "Select Types"
        },
        "comment": {
          "type": "string",
          "title": "Comment",
          "maxLength": 20,
          "validationMessage": "Don't be greedy!",
          "placeholder": "Make a comment"
        },
        "email": {
          "type": "string",
          "title": "Email",
          "pattern": "^\\S+@\\S+$",
          "description": "Email will be used for evil.",
          "validationMessage": "Invalid email"
        },
        "number": {
          "type": "number",
          "title": "Numbers",
        },
        "radios": {
          "type": "string",
          "title": "Basic radio button example",
          "enum": [
            "a",
            "b",
            "c"
          ]
        },
        "confirm": {
            type: "boolean",
            title: "Radio Boxes",
            default: false
        },
        "birthDate": {
          "type": "string",
          "title": "Birthday",
          "format": "date"
        }
      },
      "required": [
        "name",
        "email",
        "comment"
      ]
    };

    $scope.form = [
      "name",
      "title",
      "email",
      "number",
      {
        "key": "noenum",
        "type": "select",
        "titleMap": [
          {
            "value": "a",
            "name": "A"
          },
          {
            "value": "b",
            "name": "B"
          },
          {
            "value": "c",
            "name": "C"
          }
        ]
      },
      {
        "key": "comment",
        "type": "textarea",
        "placeholder": "Make a comment"
      },
      {
        "key": "radios",
        "type": "radios",
        "titleMap": [
          {
            "value": "c",
            "name": "C"
          },
          {
            "value": "b",
            "name": "B"
          },
          {
            "value": "a",
            "name": "A"
          }
        ]
      },
      {
        key: "confirm",
        type: "radios",
        titleMap: [
          { value: false, name: "No I don't understand these cryptic terms" },
          { value: true, name: "Yes this makes perfect sense to me" }
        ]
      },
      {
        "key": "birthDate",
        "minDate": "1995-09-01",
        "maxDate": new Date(),
        "format": "yyyy-mm-dd"
      },
      {
        type: "submit",
        style: "btn-info",
        title: "Calculate"
      }
    ];*/



    $scope.onSubmit = function(form) {
      // First we broadcast an event so all fields validate themselves
      $scope.$broadcast('schemaFormValidate');

      // Then we check if the form is valid
      if (form.$valid) {
        // ... do whatever you need to do with your data.
        alert('Perfecto!. Bravo!! Hai compilato bene!!!');
      }
    };

  }

angular.module('preventivitoreApp')
  .controller('MainCtrl', MainCtrl)
  .controller('AboutCtrl', AboutCtrl)
  .controller('ContactCtrl', ContactCtrl)
  .controller('LandingCtrl', LandingCtrl)
  .controller('ExampleCtrl', ExampleCtrl)
  .controller('FormController', FormController)
  .controller('AppCtrl', ['$scope', function ($scope) {
    $scope.stdFormTemplate = {
      "fieldset": {
        "type": "fieldset",
        "label": "fieldset",
        "fields": {
          "text": {
            "type": "text",
            "label": "text",
            "placeholder": "text"
          },
          "date": {
            "type": "date",
            "label": "date",
            "placeholder": "date"
          },
          "datetime": {
            "type": "datetime",
            "label": "datetime",
            "placeholder": "datetime"
          },
          "datetime-local": {
            "type": "datetime-local",
            "label": "datetime-local",
            "placeholder": "datetime-local"
          },
          "email": {
            "type": "email",
            "label": "email",
            "placeholder": "email"
          },
          "month": {
            "type": "month",
            "label": "month",
            "placeholder": "month"
          },
          "coordinates-fieldset": {
            "type": "fieldset",
            "label": "nested model example",
            "fields": {
              "coordinates.lat": {
                "type": "number",
                "label": "coordinates.lat",
                "placeholder": "coordinates.lat",
                "val": 36.5
              },
              "coordinates.lon": {
                "type": "number",
                "label": "coordinates.lon",
                "placeholder": "coordinates.lon",
                "val": -0.15
              }
            }
          },
          "number": {
            "type": "number",
            "label": "number",
            "placeholder": "number"
          },
          "password": {
            "type": "password",
            "label": "password",
            "placeholder": "password"
          },
          "search": {
            "type": "search",
            "label": "search",
            "placeholder": "search"
          },
          "tel": {
            "type": "tel",
            "label": "tel",
            "placeholder": "tel"
          },
          "textarea": {
            "type": "textarea",
            "label": "textarea",
            "placeholder": "textarea",
            "splitBy": "\n",
            "val": ["This array should be","separated by new lines"]
          },
          "time": {
            "type": "time",
            "label": "time",
            "placeholder": "time"
          },
          "url": {
            "type": "url",
            "label": "url",
            "placeholder": "url"
          },
          "week": {
            "type": "week",
            "label": "week",
            "placeholder": "week"
          }
        }
      },
      "checkbox": {
        "type": "checkbox",
        "label": "checkbox"
      },
      "color": {
        "type": "color",
        "label": "color"
      },
      "file": {
        "type": "file",
        "label": "file",
        "multiple": true
      },
      "range": {
        "type": "range",
        "label": "range",
        "model": "number",
        "val": 42,
        "minValue": -42,
        "maxValue": 84
      },
      "select": {
        "type": "select",
        "label": "select",
        "empty": "nothing selected",
        "options": {
          "first": {
            "label": "first option"
          },
          "second": {
            "label": "second option",
            "group": "first group"
          },
          "third": {
            "label": "third option",
            "group": "second group"
          },
          "fourth": {
            "label": "fourth option",
            "group": "first group"
          },
          "fifth": {
            "label": "fifth option"
          },
          "sixth": {
            "label": "sixth option",
            "group": "second group"
          },
          "seventh": {
            "label": "seventh option"
          },
          "eighth": {
            "label": "eighth option",
            "group": "first group"
          },
          "ninth": {
            "label": "ninth option",
            "group": "second group"
          },
          "tenth": {
            "label": "tenth option"
          }
        }
      },
      "checklist": {
        "type": "checklist",
        "label": "checklist",
        "options": {
          "first": {
            "label": "first option"
          },
          "second": {
            "label": "second option",
            "isOn": "on",   //  If you use Angular versions 1.3.x and up, this needs to be changed to "'on'"...
            "isOff": "off"  //  If you use Angular versions 1.3.x and up, this needs to be changed to "'off'"...
          }
        }
      },
      "radio": {
        "type": "radio",
        "label": "radio",
        "values": {
          "first": "first option",
          "second": "second option",
          "third": "third option",
          "fourth": "fourth option",
          "fifth": "fifth option"
        }
      },
      "button": {
        "type": "button",
        "label": "button"
      },
      "hidden": {
        "type": "hidden",
        "label": "hidden",
        "val": "hidden"
      },
      "image": {
        "type": "image",
        "label": "image",
        "source": "http://angularjs.org/img/AngularJS-large.png"
      },
      "legend": {
        "type": "legend",
        "label": "legend"
      },
      "reset": {
        "type": "reset",
        "label": "reset"
      },
      "submit": {
        "type": "submit",
        "label": "submit"
      },
      "bogus": {
        "type": "bogus",
        "label": "bogus"
      }
    };
    $scope.stdFormData = {};
    $scope.urlFormData = {};
  }])
  .filter('pretty', function() {
    return function (input) {
      var temp;
      try {
        temp = angular.fromJson(input);
      }
      catch (e) {
        temp = input;
      }

      return angular.toJson(temp, true);
    };
  });

}());

