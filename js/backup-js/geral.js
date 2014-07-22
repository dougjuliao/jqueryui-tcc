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
        $(".menu-accordion li").on('click',function(){
            var classbotao = $(this).attr('class');
            hideaccordion.show();
            //variaveis de seletores para as  informações não precisarem ser relidas.
            var defaultselect = $("#accordion-default"),
                collapseselect = $("#accordion-collapse"),
                fillselect = $(".accordion-resize"),
                customizeselect = $("#accordion-custom-icon"),
                autoopenselect = $("#accordion-auto-height"),
                hoverselect = $("#accordion-hover"),
                sortableselect = $("#accordion-sortable");


             //If para definir qual conteudo será mostrado e escondido na página.
            if(classbotao == "default" ){
                defaultselect.effect('slide');
                collapseselect.hide();
                customizeselect.hide();
                fillselect.hide();
                autoopenselect.hide();
                hoverselect.hide();
                sortableselect.hide();
            }else if(classbotao == "collapse"){
                defaultselect.hide();
                collapseselect.effect('slide');
                customizeselect.hide();
                fillselect.hide();
                autoopenselect.hide();
                hoverselect.hide();
                sortableselect.hide();
            }else if(classbotao == "customize"){
                defaultselect.hide();
                collapseselect.hide();
                customizeselect.effect('slide');
                fillselect.hide();
                autoopenselect.hide();
                hoverselect.hide();
                sortableselect.hide();
            }else if(classbotao == "fill"){
                defaultselect.hide();
                collapseselect.hide();
                customizeselect.hide();
                fillselect.effect('slide');
                autoopenselect.hide();
                hoverselect.hide();
                sortableselect.hide();
            }else if(classbotao == "no-height"){
                defaultselect.hide();
                collapseselect.hide();
                customizeselect.hide();
                fillselect.hide();
                autoopenselect.effect('slide');
                hoverselect.hide();
                sortableselect.hide();
            }else if(classbotao == "open-hover"){
                defaultselect.hide();
                collapseselect.hide();
                customizeselect.hide();
                fillselect.hide();
                autoopenselect.hide();
                hoverselect.effect('slide');
                sortableselect.hide();
            }else if(classbotao == "sortable-aba"){
                defaultselect.hide();
                collapseselect.hide();
                customizeselect.hide();
                fillselect.hide();
                autoopenselect.hide();
                hoverselect.hide();
                sortableselect.effect('slide');
            }

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
            var dragdefault = $(".content-default"),
                dragmovement = $(".content-movement"),
                dragcursor = $(".content-cursor"),
                dragdelay = $(".content-delay"),
                dragevent = $(".content-event"),
                draghandle = $(".content-handle"),
                dragrevert = $(".content-revert"),
                draggrid = $(".content-grid"),
                dragfeedback = $(".content-feedback"),
                dragsortable = $(".content-sortable");
 
            console.log(classbotao);
             //If para definir qual conteudo será mostrado e escondido na página.
            if(classbotao == "drag-default-bt"){
                dragdefault.effect('slide');
                dragmovement.hide();
                dragcursor.hide();
                dragdelay.hide();
                dragevent.hide();
                draghandle.hide();
                dragrevert.hide();
                draggrid.hide();
                dragfeedback.hide();
                dragsortable.hide();

            }else if(classbotao == "drag-movement-bt"){
                dragdefault.hide();
                dragmovement.effect('slide');
                dragcursor.hide();
                dragdelay.hide();
                dragevent.hide();
                draghandle.hide();
                dragrevert.hide();
                draggrid.hide();
                dragfeedback.hide();
                dragsortable.hide();

            }else if(classbotao == "drag-cursor-bt"){
                dragdefault.hide();
                dragmovement.hide();
                dragcursor.effect('slide');
                dragdelay.hide();
                dragevent.hide();
                draghandle.hide();
                dragrevert.hide();
                draggrid.hide();
                dragfeedback.hide();
                dragsortable.hide();

            }else if(classbotao == "drag-delay-bt"){
                dragdefault.hide();
                dragmovement.hide();
                dragcursor.hide();
                dragdelay.effect('slide');
                dragevent.hide();
                draghandle.hide();
                dragrevert.hide();
                draggrid.hide();
                dragfeedback.hide();
                dragsortable.hide();

            }else if(classbotao == "drag-event-bt"){
                dragdefault.hide();
                dragmovement.hide();
                dragcursor.hide();
                dragdelay.hide();
                dragevent.effect('slide');
                draghandle.hide();
                dragrevert.hide();
                draggrid.hide();
                dragfeedback.hide();
                dragsortable.hide();

            }else if(classbotao == "drag-handle-bt"){
                dragdefault.hide();
                dragmovement.hide();
                dragcursor.hide();
                dragdelay.hide();
                dragevent.hide();
                draghandle.effect('slide');
                dragrevert.hide();
                draggrid.hide();
                dragfeedback.hide();
                dragsortable.hide();

            }else if(classbotao == "drag-revert-bt"){
                dragdefault.hide();
                dragmovement.hide();
                dragcursor.hide();
                dragdelay.hide();
                dragevent.hide();
                draghandle.hide();
                dragrevert.effect('slide');
                draggrid.hide();
                dragfeedback.hide();
                dragsortable.hide();

            }else if(classbotao == "drag-grid-bt"){
                dragdefault.hide();
                dragmovement.hide();
                dragcursor.hide();
                dragdelay.hide();
                dragevent.hide();
                draghandle.hide();
                dragrevert.hide();
                draggrid.effect('slide');
                dragfeedback.hide();
                dragsortable.hide();

            }else if(classbotao == "drag-feedback-bt"){
                dragdefault.hide();
                dragmovement.hide();
                dragcursor.hide();
                dragdelay.hide();
                dragevent.hide();
                draghandle.hide();
                dragrevert.hide();
                draggrid.hide();
                dragfeedback.effect('slide');
                dragsortable.hide();

            }else if(classbotao == "drag-sortable-bt"){
                dragdefault.hide();
                dragmovement.hide();
                dragcursor.hide();
                dragdelay.hide();
                dragevent.hide();
                draghandle.hide();
                dragrevert.hide();
                draggrid.hide();
                dragfeedback.hide();
                dragsortable.effect('slide');
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
