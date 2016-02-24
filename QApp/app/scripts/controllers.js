'use strict';
/**
 * Created by Admin on 18/02/2016.
 */


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
    this.message = 'Quello è la About pagina';
  }

  function ContactCtrl(){
    this.message = 'Quello è la Contact pagina';
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
    var j = 0;
    for(var i in arr) {
      if(typeof(arr[i].tipoVariabile['tipologia']) !== 'undefined' && arr[i].tipoVariabile['tipologia'] === 'LISTA') {
        j++;
        if(typeof(arr[i].tipoVariabile['tipoVariabile'].tipologia) !== 'undefined' && arr[i].tipoVariabile['tipoVariabile'].tipologia === 'COMPLESSO') {
          if(typeof(arr[i].tipoVariabile['tipoVariabile'].listaVariabili) !== 'undefined') {
              getNestedChildrenzz(arr[i].tipoVariabile['tipoVariabile'].listaVariabili, arr[i].idVariabile);
          }
        }
      }else{
        //Determine if object is simple or complex type
        if(head === null){
          arr[i].complexHeader = arr[i].idVariabile;
          arr[i].objType = 0;
        }else{
          arr[i].complexHeader = head;
          arr[i].objType = 1;
        }
        reprocessedJSON.push(arr[i]);
      }
    }
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

  function ProductListCtrl($scope){
    $scope.data = {
      repeatSelect: null,
      availableOptions: [
        {id: '1', name: 'Option A'},
        {id: '2', name: 'Option B'},
        {id: '3', name: 'Option C'}
      ],
      products: [
        {name:'1', value:'Product 1'},
        {name:'2', value:'Product 2'}
      ]
    };

    var selectedProduct = null;

    $scope.selectProduct = function(prod){
      console.log('$scope.product: ' + JSON.stringify(selectedProduct));
      selectedProduct = (selectedProduct === prod) ? null : prod;
    };

    $scope.isSelectedProduct = function(prod){
      console.log('isSelectedProduct: ' + JSON.stringify(prod));
      return prod === selectedProduct;
    };

    $scope.onChange = function(){
      console.log('$scope.product: ' + JSON.stringify($scope.product));
      $scope.showProductForm = true;
      console.log('$scope.showProductForm: ' + JSON.stringify($scope.showProductForm));
    };

    $scope.diplayProductDetails = function(){
      if($scope.showProductForm === true){
        return true;
      }
      return false;
    };
  }

  function ProductCalculationCtrl($scope, QuestionarioService,$http) {

    $scope.products = [];
    $scope.customError = false;
    $scope.q = {inputJson: { massimale:'5000000', numeroCariche: '2',
      enteCariche: [
        { ente:'1', carica:'A' },
        { "ente":'2', carica:'B' }
      ]},
      garanzie: ['MEMCOM' ,'RCPROF' ,'RCDANNIMC'],
      validita: 1456154782551
  };

    //The value for the variable is expected from the questionario form via a service
    //
    var questionario = {
      "inputJson" : {"massimale":"5000000",
        "numeroCariche": "2",
        "enteCariche": [
          { "ente":"1", "carica":"A" },
          { "ente":"2", "carica":"B" }
        ]},
      "garanzie": ["MEMCOM" ,"RCPROF" ,"RCDANNIMC"],
      "validita": QuestionarioService.getCurrentTimeMills()
    };

    var inputJson = {inputJson: {}};
    inputJson.inputJson = QuestionarioService.getProductParameter();
    inputJson.garanzie = ["MEMCOM" ,"RCPROF" ,"RCDANNIMC"];
    inputJson.validita = QuestionarioService.getCurrentTimeMills();


    var onSuccess = function(data){
      $scope.products = data;
      if(data.prodotto === null){
        $scope.customError = true;
      }
    };

    var onError = function(reason){
      $scope.error = reason;
    };

    $scope.stampa = function(){

      //http://192.168.190.70:8085/TestRestAON-1.0-snapshot/
      //$("#myform").submit(JSON.stringify($scope.products),function(event){});
/*
      $.ajax('http://192.168.190.70:8085/TestRestAON-1.0-SNAPSHOT/rest/PDFRest/download',{
        'data': JSON.stringify($scope.products), //{action:'x',params:['a','b','c']}
        'type': 'POST',
        'processData': false,
        'contentType': 'application/json' //typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... check with the service to see what they expect as content-type in the HTTP header.
      });*/
  var url = 'http://192.168.190.70:8085/TestRestAON-1.0-SNAPSHOT/rest/PDFRest/download';
      /*$.fileDownload('http://192.168.190.70:8085/TestRestAON-1.0-SNAPSHOT/rest/PDFRest/download', {
        httpMethod: "POST",
        data: JSON.stringify($scope.products)
      });*/

      $http({
        method: 'POST',
        url: url,
        responseType: "blob",
        data: JSON.stringify($scope.products),
        transformResponse: function(data) {
          return data;
        }
      }).success(function(blob){

        //var blob = new Blob([data], {type: 'application/pdf', encoding: 'raw'});
        url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "Questionario.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      }).error(function(data, status) {
        scope.status = status;
      });




    };

    function getProducts(questionario) {
      QuestionarioService.getProductCalculation(questionario).then(onSuccess, onError);
    };

    getProducts(inputJson);
  }

  function FormController($scope, $state, QuestionarioService) {
    reprocessedJSON = [];
    $scope.model = {};
    $scope.product = {};
    $scope.productList = [];
    $scope.showProductForm = false;
    $scope.backend_data = [];
    $scope.error = {};
    $scope.keyPair = [];

    var onSuccess = function(data){
      reprocessedJSON = [];
      getNestedChildrenzz(data, null);
      formInputProductDetails(reprocessedJSON, $scope.productList);
    };

    var onProductLoadSuccess = function(data){
      formInputProductList(data);
    };

    var onError = function(reason){
      $scope.error = reason;
    };

    function loadProductListFields(){
      QuestionarioService.getProductParameterList().then(onSuccess, onError);
    }

    function loadProductList(){
      QuestionarioService.getProductList().then(onProductLoadSuccess, onError);
    }

    //loadProductListFields();

    loadProductList();


    function formInputProductList(data) {

      $scope.productList = data;

      var formRow = {};
      var schemaRows = {type: "object", properties: {}, required: []};
      var formRows = [];
      var schemaInputType = 'string';
      var formInputType = 'select';

      schemaRows.properties["tariffa"] = {type: schemaInputType,
          title: 'Products'
      };

      schemaRows.required.push("tariffa");

      formRow = {key: "tariffa", type: formInputType, onChange: function(modelValue, form) {
            $scope.form.pop();
            $scope.$broadcast('schemaFormRedraw');
            loadProductListFields();
          }
      };

      if(formInputType === 'select'){
          formRow.titleMap = keyValuePairzz(data, data);
      }else if(formInputType === 'radios'){
          formRow.titleMap = [{ value: "0", name: "No" }, { value: "1", name: "Yes" }];
      }
      formRows.push(formRow);

      $scope.schema = schemaRows;
      $scope.form = formRows;
    }

    function formInputProductDetails(data, products) {

      $scope.field = data;

      var formRow = {};
      var schemaRows = {type: "object", properties: {}, required: []};
      var formRows = [];
      var schemaInputType = '';
      var formInputType = '';
      var schemaInputTypeArray = 'array';

      var arrayKey = '';
      var simpleKey = '';
      var objectT = "object";
      var keyHolder = '';
      var counter = 0;


      /****TODO: To Be reviewed*/
      var schemaInputTypex = 'string';
      var formInputTypex = 'select';

      schemaRows.properties["tariffa"] = {type: schemaInputTypex,
        title: 'Products'
      };

      schemaRows.required.push("tariffa");

      formRow = {key: "tariffa", type: formInputTypex};

      if(formInputTypex === 'select'){
        formRow.titleMap = keyValuePairzz(products, products);
      }else if(formInputTypex === 'radios'){
        formRow.titleMap = [{ value: "N", name: "No" }, { value: "S", name: "Si" }];
      }
      formRows.push(formRow);

      /*End: To Be reviewed*/

      for (var j in $scope.field) {
        //$scope.keyPair.push({key: $scope.field[j].idVariabile, value: $scope.field[j].rootHeader});
        schemaInputType = schemaInputTypeMapping($scope.field[j].tipoVariabile.tipologia);
        simpleKey = $scope.field[j].idVariabile;
        arrayKey = $scope.field[j].complexHeader;

        //Loading schema property begins here

        //Set the required property of the schema object
        //Ensure to check if field is mandatory
        if(schemaRows.required.indexOf(arrayKey)==-1){
          schemaRows.required.push(arrayKey);
        }


        if($scope.field[j].objType === 0){
        schemaRows.properties[simpleKey] = {type: schemaInputType,
            title: formatIdVariabilezz(simpleKey)
            };
        }else if($scope.field[j].objType === 1){

          if(arrayKey !== null && typeof arrayKey !== 'undefined'){
            if(arrayKey !== null && typeof(schemaRows.properties[arrayKey]) === 'undefined'){
              schemaRows.properties[arrayKey] = {type: schemaInputTypeArray, title: formatIdVariabilezz(arrayKey),
                items: {type: objectT, properties: {}}, required: []};
              schemaRows.properties[arrayKey].items.properties = {type: schemaInputType,
                title: formatIdVariabilezz(simpleKey)
              }
            }else{
              schemaRows.properties[arrayKey].items.properties = {type: schemaInputType,
                title: formatIdVariabilezz(simpleKey)
              }
            }
          }

          //Ensure to check if field is mandatory
          schemaRows.properties[arrayKey].required.push(simpleKey);

        }//Loading schema property ends here

        //Loading form property begins here
        if($scope.field[j].objType === 0){
          if($scope.field[j].tipoVariabile.tipologia === 'LISTA_VALORI' || $scope.field[j].tipoVariabile.tipologia === 'BOOLEANO'){
            formInputType = formInputTypeMapping($scope.field[j].tipoVariabile.tipologia);
            formRow = {key: arrayKey, type: formInputType, title: formatIdVariabilezz(simpleKey) };
            if(formInputType === 'select'){
              formRow.titleMap = keyValuePairzz($scope.field[j].tipoVariabile.values, $scope.field[j].tipoVariabile.descr);
            }else if(formInputType === 'radios'){
              formRow.titleMap = [{ value: "N", name: "No" }, { value: "S", name: "Si" }];
            }
            formRows.push(formRow);
          }else{
            formRows.push(arrayKey);
          }
        }else if($scope.field[j].objType === 1){

            formInputType = formInputTypeMapping($scope.field[j].tipoVariabile.tipologia);

			if(arrayKey !== null && typeof arrayKey !== 'undefined'){
        if(arrayKey !== null && keyHolder !== arrayKey){
          formRow = {key: arrayKey, add: 'Add New',
					  style: { add: 'btn-success'
					}, items: []};
          keyHolder = arrayKey;
				}else{
          counter++;
        }

        if($scope.field[j].tipoVariabile.tipologia === 'LISTA_VALORI' || $scope.field[j].tipoVariabile.tipologia === 'BOOLEANO'){
            var myKey = arrayKey + '[].' + simpleKey;
            //console.log(myKey);
					  formRow.items[counter] = {key: myKey, type: formInputType, title: formatIdVariabilezz(simpleKey),titleMap: []};
            //console.log(formRow.items[counter].key, simpleKey);
				    if(formInputType === 'select'){
						  formRow.items[counter].titleMap = keyValuePairzz($scope.field[j].tipoVariabile.values, $scope.field[j].tipoVariabile.descr);
						}else if(formInputType === 'radios'){
							formRow.items[counter].titleMap = [{ value: "N", name: "No" }, { value: "S", name: "Si" }];
						}


            //console.log('formRow', JSON.stringify(formRow));
            //console.log('formRows', JSON.stringify(formRows));
        }else{
						formRow.items.push(arrayKey + '[].' + simpleKey);
						//formRows.push(formRow);
				}

        if(formRows.indexOf(formRow) == -1) {
          formRows.push(formRow);
        }
				/*}else{
					if($scope.field[j].tipoVariabile.tipologia === 'LISTA_VALORI' || $scope.field[j].tipoVariabile.tipologia === 'BOOLEANO'){
						formRow.items = {key: arrayKey + '[].' + simpleKey, type: formInputType};
						if(formInputType === 'select'){
							formRow.items.titleMap = keyValuePairzz($scope.field[j].tipoVariabile.values, $scope.field[j].tipoVariabile.descr);
						}else if(formInputType === 'radios'){
							formRow.items.titleMap = [{ value: "0", name: "No" }, { value: "1", name: "Yes" }];
						}
						formRows.push(formRow);
					}else{
						formRow.items = arrayKey + '[].' + simpleKey;
						formRows.push(arrayKey);
					}
				}*/
			}


        }//Loading form property ends here



      }
      var submitBtn = {type: "submit", style: "btn-info",  title: "Calculate" };
      formRows.push(submitBtn);

      $scope.schema = schemaRows;
      $scope.form = formRows;

    }

    /*$scope.schema = {
      "type": "object",
      "title": "Comment",
      "required": [
        "comments"
      ],

      "properties": {
        "comments": {
          "type": "array",
          "title": "My Comments",
          "maxItems": 2,
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "title": "Name",
                "type": "string"
              },
              "email": {
                "title": "Email",
                "type": "string",
                "pattern": "^\\S+@\\S+$",
                "description": "Email will be used for evil."
              },
              "spam": {
                "title": "Spam",
                "type": "boolean",
                "default": true
              },
              "comment": {
                "title": "Comment",
                "type": "string",
                "maxLength": 20,
                "validationMessage": "Don't be greedy!"
              },
              "title2": {
                "title": "Title",
                "type": "string",
                "enum": ['Dr','Jr','Sir','Mrs','Mr','NaN','Dj','Prof']
              },
              "noenum": {
                type: "string",
                title: "Select Types"
              },
            },
            "required": [
              "name",
              "comment"
            ]
          }
        },
        "title": {
          type: "string",
          title: "Title",
          enum: ['Dr','Jr','Sir','Mrs','Mr','NaN','Dj','Prof']
        }
      }
    };

    $scope.form = [
      "title",
      {
        "type": "help",
        "helpvalue": "<h4>Array Example</h4><p>Try adding a couple of forms, reorder by drag'n'drop.</p>"
      },
      {
        "key": "comments",
        "add": "New",
        "style": {
          "add": "btn-success"
        },
        "items": [
          "comments[].name",
          "comments[].email",
          "comments[].title2",
          {
            "key": "comments[].spam",
            "type": "checkbox",
            "title": "Yes I want spam.",
            "condition": "model.comments[arrayIndex].email"
          },
          {
            "key": "comments[].comment",
            "type": "textarea"
          },
          {
            "key": "noenum",
            "type": "select",
            "title": "Select Types",
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
          }
        ]
      },
      {
        "type": "submit",
        "style": "btn-info",
        "title": "OK"
      }
    ];*/




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

    $scope.model = {};

    $scope.onSubmit = function(form) {
      // First we broadcast an event so all fields validate themselves
      $scope.$broadcast('schemaFormValidate');

      // Then we check if the form is valid
      if (form.$valid) {

        QuestionarioService.setProductParameter($scope.model);
        $state.go('productlist');



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
  .controller('ProductListCtrl', ProductListCtrl)
  .controller('ProductCalculationCtrl', ProductCalculationCtrl)
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

