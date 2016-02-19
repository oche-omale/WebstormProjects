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

angular.module('preventivitoreApp')
  .controller('MainCtrl', MainCtrl)
  .controller('AboutCtrl', AboutCtrl)
  .controller('ContactCtrl', ContactCtrl)
  .controller('LandingCtrl', LandingCtrl)
  .controller('ExampleCtrl', ExampleCtrl);

}());

