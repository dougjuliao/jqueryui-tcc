$(document).ready(function(){

    /* --------------------------------FUNÇÕES E LÓGICAS FEITAS POR DOUGLAS JULIÃO -----------------------------*/

    $.ajaxSetup({cache: false}); //Não salvar pagina em cache.


    $("#menu-indice li").on('click',function(){  //Carregar páginas com ajax
        var id = $(this).attr('id');
        $(function() {

            //variaveis para os numeros randomicos criados em javascript.
            var efeitoentrar = randomefeito();
            var efeitosair = randomefeitosair();

            //load das páginas html, aqui eu pego o nome das páginas pelo id e acrescento html.
            $(".conteudo-section-direita")
                .effect("slide")
                .load(id+".html .content-html" , function() {//função de callback.
                        $(document).ready(function() {
                            $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
                        });
                    if (id === 'accordion'){

                        /*-------------- ACCORDION ---------------*/

                        $("#accordion-default").accordion(); //default
                        $("#accordion-collapse").accordion({ //collapse
                            collapsible:true
                        });
                        $("#accordion-custom-icon").accordion({ //custom icons
                            icons:{ "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" },
                            collapsible:true
                        });

                        $("#accordion-fill").accordion({ //resize - fill
                            collapsible:true,
                            heightStyle: "fill"
                        });
                        $(".accordion-resize").resizable({
                            minWidth:180,
                            minHeight:250,

                            resize:function(){
                                $("#accordion-fill").accordion("refresh",{collapsible:true});
                            }
                        });
                        $("#accordion-auto-height").accordion({//No Auto Height
                            heightStyle : "content"
                        });

                        // função para criar o accordion com hover
                        $( "#accordion-hover" ).accordion({
                            event: "click hoverintent"
                        });
                        $.event.special.hoverintent = {
                            setup: function() {
                                $( this ).bind( "mouseover", jQuery.event.special.hoverintent.handler );
                            },
                            teardown: function() {
                                $( this ).unbind( "mouseover", jQuery.event.special.hoverintent.handler );
                            },
                            handler: function( event ) {
                                var currentX, currentY, timeout,
                                    args = arguments,
                                    target = $( event.target ),
                                    previousX = event.pageX,
                                    previousY = event.pageY;

                                function track( event ) {
                                    currentX = event.pageX;
                                    currentY = event.pageY;
                                };

                                function clear() {
                                    target
                                        .unbind( "mousemove", track )
                                        .unbind( "mouseout", clear );
                                    clearTimeout( timeout );
                                }

                                function handler() {
                                    var prop,
                                        orig = event;

                                    if ( ( Math.abs( previousX - currentX ) +
                                        Math.abs( previousY - currentY ) ) < 7 ) {
                                        clear();

                                        event = $.Event( "hoverintent" );
                                        for ( prop in orig ) {
                                            if ( !( prop in event ) ) {
                                                event[ prop ] = orig[ prop ];
                                            }
                                        }
                                        // Prevent accessing the original event since the new event
                                        // is fired asynchronously and the old event is no longer
                                        // usable (#6028)
                                        delete event.originalEvent;

                                        target.trigger( event );
                                    } else {
                                        previousX = currentX;
                                        previousY = currentY;
                                        timeout = setTimeout( handler, 100 );
                                    }
                                }

                                timeout = setTimeout( handler, 100 );
                                target.bind({
                                    mousemove: track,
                                    mouseout: clear
                                });
                            }
                        };

                        $("#accordion-sortable").accordion({//Accordion sortable
                            header: "> div > h3",
                            heightStyle : "content"
                        }).sortable({
                                axis: "y",
                                handle: "h3",
                                stop: function( event, ui ) {
                                    ui.item.children( "h3" ).triggerHandler( "focusout" );
                                }
                            });

                        //carrega botoes menu
                        botoesmenu();
                    }else if (id === 'addclass'){

                        /*-------------- ADDCLASS ---------------*/
                        var boxclass =  $( ".box-class" );

                        $( ".addclass-botao" ).click(function() {
                            boxclass.addClass( "novaclass");
                            return false;
                        });
                        $( ".removeclass-botao" ).click(function() {
                            boxclass.removeClass( "novaclass");
                        });

                    }else if (id === 'animate'){

                        /*-------------- ANIMATE ---------------*/
                        $(function() {
                            var state = true;
                            $( ".botao-animate" ).click(function() {
                                if ( state ) {
                                    $( ".box-class" ).animate({
                                        backgroundColor: "#fff",
                                        color: "#000",
                                        width: 500
                                    }, 1000 );
                                } else {
                                    $( ".box-class" ).animate({
                                        backgroundColor: "#000",
                                        color: "#fff",
                                        width: 700
                                    }, 1000 );
                                }
                                state = !state;
                            });
                        });

                    }else if (id === 'autocomplete'){
                        /*-------------- AUTOCOMPLETE ---------------*/
                        $(function() {
                            var availableTags = [
                                "ActionScript",
                                "AppleScript",
                                "Asp",
                                "BASIC",
                                "C",
                                "C++",
                                "Clojure",
                                "COBOL",
                                "ColdFusion",
                                "Erlang",
                                "Fortran",
                                "Groovy",
                                "Haskell",
                                "Java",
                                "JavaScript",
                                "Lisp",
                                "Perl",
                                "PHP",
                                "Python",
                                "Ruby",
                                "Scala",
                                "Scheme"
                            ];
                            $( "#autocomplete-botao" ).autocomplete({
                                source: availableTags
                            });
                        });

                    }else if (id === 'button'){
                        /*-------------- BUTTON ---------------*/
                        $(".default-botao").button();//default
                        $("#checkbox-botao").button();//checkbox
                        $(".icon-botao").button({//icon
                            icons: {
                                primary: "ui-icon-locked"
                            }
                        });
                        $(".radio-botao").buttonset();
                        $(function() {//split
                            $(".split-botao").button({
                                icons: {
                                    primary: "ui-icon-triangle-1-s"
                                }
                            }).click(function(){
                                var menu = $( this ).parent().next().show().position({
                                    my: "left top",
                                    at: "left bottom",
                                    of: this
                                });
                                $( document ).one( "click", function() {
                                    menu.hide();
                                });
                                return false;
                            }).parent().buttonset().next().hide().menu();
                        });


                    }else if (id === 'datepicker'){
                        /*-------------- DATEPICKER ---------------*/
                        $('.datepicker-input').datepicker();//dafault
                        $('.datepicker-input2').datepicker({//com botões
                            showButtonPanel: true
                        });
                        $('.datepicker-input3').datepicker({// display mês e ano
                            changeMonth:true,
                            changeYear:true
                        });
                        $('.datepicker-input4').datepicker({// display mês e ano total(multiple)
                            numberOfMonths: 3,
                            showButtonPanel: true
                        });
                        $('.datepicker-input5').datepicker({// icone
                            showOn: "button",
                            buttonImage: "img/calendar.gif",
                            buttonImageOnly: true
                        });

                    }else if (id === 'dialog'){
                        /*-------------- DIALOG ---------------*/
                        $(".menu-dialog li").on("click",function(){//Menu dialog
                            var classbotaodialog = $(this).attr('class');//Pego o nome da class
                            if(classbotaodialog == "dialog-default-bt"){
                                $(".dialog-default").dialog();//default
                            }else if(classbotaodialog == "dialog-animation-bt"){
                                $(".dialog-animation").dialog({//animation
                                    //autoOpen:false,
                                    show:{
                                        effect: randomefeito(),
                                        duration: 1000
                                    },
                                    hide:{
                                        effect: randomefeitosair(),
                                        duration: 1000
                                    }
                                });
                            }else if(classbotaodialog == "dialog-basic-bt"){
                                $(".dialog-basic").dialog({//basic modal
                                    modal:true
                                });
                            }else if(classbotaodialog == "dialog-confirmation-bt"){
                                $(".dialog-confirmation").dialog({//confirmation
                                    modal:true,
                                    hide:{
                                        effect: "explode"
                                    },
                                    buttons:{
                                        "Deletar alguma coisa": function(){
                                            $(this).dialog("close");
                                        },
                                        Cancel: function(){
                                            $(this).dialog("close");
                                        }
                                    }
                                });
                            }else if(classbotaodialog == "dialog-form-bt"){
                                $(".dialog-form").dialog({
                                    modal:true,
                                    hide:"explode",
                                    duration:800,
                                    buttons:{
                                        "Salvar": function(){
                                           window.alert("Dados salvos com sucesso");
                                        },
                                        cancel: function(){
                                            $(this).dialog("close");
                                        }
                                    }
                                });
                            }else if(classbotaodialog == "dialog-message-bt"){
                                $(".dialog-message").dialog({
                                    modal:true,
                                    buttons:{
                                        Ok: function(){
                                            $(this).dialog("close");
                                        }
                                    }
                                });
                            }
                        });

                    }else if (id === 'draggable'){
                        /*-------------- DRAGGABLE ---------------*/
                            $(".drag-default").draggable(); // default

                            $(".drag-movement").draggable({ scroll : false,axis:"x" }); // Movement
                            $(".drag-movement1").draggable({ scroll : false,axis:"y" }); 
                            $(".drag-movement2").draggable({ containment:".container-drag",scroll : false });

                            $('.drag-cursor').draggable(); //curosr
                            $('.drag-cursor1').draggable({cursor: 'crosshair'});
                            $('.drag-cursor2').draggable({cursor: 'e-resize'});
                            $('.drag-cursor3').draggable({cursor: 'n-resize'});
                            $('.drag-cursor4').draggable({cursor: 'no-drop'});
                            $('.drag-cursor5').draggable({cursor: 'cell', cursorAt: { top: 56, left: 56 } });

                            $('.drag-delay').draggable({delay: 400 }); //delay
                            $( ".drag-delay1" ).draggable({ distance: 100 }); //distance

                            $(function() { //event
                                var $start_counter = $( "#event-start" ),
                                  $drag_counter = $( "#event-drag" ),
                                  $stop_counter = $( "#event-stop" ),
                                  counts = [ 0, 0, 0 ];
                             
                                $( ".drag-event" ).draggable({
                                  start: function() {
                                    counts[ 0 ]++;
                                    updateCounterStatus( $start_counter, counts[ 0 ] );
                                  },
                                  drag: function() {
                                    counts[ 1 ]++;
                                    updateCounterStatus( $drag_counter, counts[ 1 ] );
                                  },
                                  stop: function() {
                                    counts[ 2 ]++;
                                    updateCounterStatus( $stop_counter, counts[ 2 ] );
                                  }
                                });
                             
                                function updateCounterStatus( $event_counter, new_count ) {
                                  // first update the status visually...
                                  if ( !$event_counter.hasClass( "ui-state-hover" ) ) {
                                    $event_counter.addClass( "ui-state-hover" )
                                      .siblings().removeClass( "ui-state-hover" );
                                  }
                                  // ...then update the numbers
                                  $( "span.count", $event_counter ).text( new_count );
                                }
                            });

                            $(".drag-handle").draggable({ cancel: "p"});   //handle   handle: "p" => move pelo p

                            $(".drag-revert").draggable({ revert:true, scroll : false }); // revert

                            $(".drag-grid").draggable({ snap: true}); //snap
                            $(".drag-grid1").draggable({ grid: [20,20]}); //grid

                            $(".drag-feedback").draggable({ opacity: 0.7, helper: "clone"}); // feedback/helper
                            $(".drag-feedback1").draggable({ // feedback/helper
                                cursor: "move",
                                cursorAt: { top: -12, left: -20 },
                                helper: function( event ) {
                                    return $( "<div class='ui-widget-header'>Olha a ajuda aqui!</div>" );
                                }
                            }); 

                            $(function() {
                                $( ".drag-sortable" ).sortable({
                                  revert: true
                                });
                                $( ".drag-sortable1" ).draggable({
                                  connectToSortable: ".drag-sortable",
                                  helper: "clone",
                                  revert: "invalid"
                                });
                                $( "ul, li" ).disableSelection();
                            });
                            //função para o menu draggable
                            menudrag();

                    }else if (id === 'droppable'){
                        /*-------------- DROPPABLE ---------------*/

                    }else if (id === 'effect'){
                        /*-------------- EFFECT ---------------*/

                    }else if (id === 'hide'){
                        /*-------------- HIDE ---------------*/

                    }else if (id === 'images'){
                        /*-------------- IMAGES ---------------*/

                    }else if (id === 'jquery-ui'){
                        /*-------------- JQUERY-UI ---------------*/

                    }else if (id === 'menu'){
                        /*-------------- MENU ---------------*/

                    }else if (id === 'position'){
                        /*-------------- POSITION ---------------*/

                    }else if (id === 'progressbar'){
                        /*-------------- PROGRESSBAR ---------------*/

                    }else if (id === 'removeclass'){
                        /*-------------- REMOVECLASS ---------------*/

                    }else if (id === 'resizable'){
                        /*-------------- RESIZABLE ---------------*/

                    }else if (id === 'selectable'){
                        /*-------------- SELECTABLE ---------------*/

                    }else if (id === 'show'){
                        /*-------------- SHOW ---------------*/

                    }else if (id === 'slider'){
                        /*-------------- SLIDER ---------------*/

                    }else if (id === 'sortable'){
                        /*-------------- SORTABLE ---------------*/

                    }
                });

            //Add class para o menu atual
            $('#'+id).addClass('current-menu').siblings().removeClass('current-menu');
            //console.log(id+".html");
        });
    });

    /*----FUNÇÃO PARA BOTÕES - ACCORDION ----*/
    function botoesmenu(){
        var hideaccordion = $('.hide-accordion'); 
            hideaccordion.hide();
            var posicaoAnterior = null;
        $(".menu-accordion li").on('click',function(){
            var classbotao = $(this).attr('class');
            var idbotao = $(this).attr('id');
            
            
            hideaccordion.show();

            //variaveis de seletores para as  informações não precisarem ser relidas.
            var slides = new Array;
                slides[0]= $("#accordion-default"),
                slides[1] = $("#accordion-collapse"),
                slides[2] = $(".accordion-resize"),
                slides[3] = $("#accordion-custom-icon"),
                slides[4] = $("#accordion-auto-height"),
                slides[5] = $("#accordion-hover"),
                slides[6] = $("#accordion-sortable"); 


               $.each(slides,function(i,valor){
                    if(i == idbotao){
                        valor.effect("slide");
                    }else{
                        valor.hide();
                    }
               }); 
                
            
            /*
            switch (classbotao){ //definir qual conteudo será mostrado e escondido na página.
                case "default":
                    $.each(slides,function(i,valor){
                        if(i == 0){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "collapse":
                    $.each(slides,function(i,valor){
                        if(i == 1){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                    
                break;
                case "customize":
                    $.each(slides,function(i,valor){
                        if(i == 2){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "fill":
                    $.each(slides,function(i,valor){
                        if(i == 3){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "no-height":
                    $.each(slides,function(i,valor){
                        if(i == 4){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "open-hover":
                    $.each(slides,function(i,valor){
                        if(i == 5){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "sortable-aba":
                    $.each(slides,function(i,valor){
                        if(i == 6){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
            }
            */

        });


    }

    /*----FUNÇÃO PARA BOTÕES - DRAGGABLE ----*/
    function menudrag(){
        var containerdrag = $('.container-drag');
            containerdrag.hide();
        $(".menu-drag li").on('click',function(){
            var classbotao = $(this).attr('class');
            containerdrag.show();
            //variaveis de seletores para as  informações não precisarem ser relidas.
            var slides = new Array;
                slides[0] = $(".content-default"),
                slides[1] = $(".content-movement"),
                slides[2] = $(".content-cursor"),
                slides[3] = $(".content-delay"),
                slides[4] = $(".content-event"),
                slides[5] = $(".content-handle"),
                slides[6] = $(".content-revert"),
                slides[7] = $(".content-grid"),
                slides[8] = $(".content-feedback"),
                slides[9] = $(".content-sortable");

            switch (classbotao){
                case "drag-default-bt":
                    $.each(slides,function(i,valor){
                        if(i == 0){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "drag-movement-bt":
                    $.each(slides,function(i,valor){
                        if(i == 1){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "drag-cursor-bt":
                    $.each(slides,function(i,valor){
                        if(i == 2){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "drag-delay-bt":
                    $.each(slides,function(i,valor){
                        if(i == 3){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "drag-event-bt":
                    $.each(slides,function(i,valor){
                        if(i == 4){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "drag-handle-bt":
                    $.each(slides,function(i,valor){
                        if(i == 5){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "drag-revert-bt":
                    $.each(slides,function(i,valor){
                        if(i == 6){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "drag-grid-bt":
                    $.each(slides,function(i,valor){
                        if(i == 7){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "drag-feedback-bt":
                    $.each(slides,function(i,valor){
                        if(i == 8){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
                case "drag-sortable-bt":
                    $.each(slides,function(i,valor){
                        if(i == 9){
                            valor.effect("slide");
                        }else{
                            valor.hide();
                        }
                    });
                break;
            }   
        });

    }

    /* ------------ FUNÇÕES PARA ADICIONAR O JQUERY UI -------------*/

	//Menu - Indice
	$("#menu-indice").menu();



});//JQUERY fim

//função para randomizar os efeitos de entrada de conteúdo
function randomefeito(){
    var numero = Math.floor(Math.random() * 3) + 1;
    var efeitoarray = new Array();
        efeitoarray[1] = "bounce";
        efeitoarray[2] = "shake";
        efeitoarray[3] = "slide";

    return efeitoarray[numero];
}
//função para randomizar os efeitos de saida de conteúdo
function randomefeitosair(){
    var numero = Math.floor(Math.random() *7)+1;
    var efeitoarray = new Array();
    efeitoarray[1] = "blind";
    efeitoarray[2] = "clip";
    efeitoarray[3] = "drop";
    efeitoarray[4] = "explode";
    efeitoarray[5] = "fade";
    efeitoarray[6] = "fold";
    efeitoarray[7] = "puff";

    return efeitoarray[numero];
}
