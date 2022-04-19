// ==UserScript==
// @name         MouseClickEP
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Emylkk
// @match        https://betteranime.net/*
// @grant        none
// ==/UserScript==
(function() {
    if (window.location.href != "https://betteranime.net/ultimosLancamentos" && window.location.href != "https://betteranime.net/" ){
        // window.alert(window.location.href)
        var skiped=0;

        $("<style type='text/css'> .notScruol{overflow:hidden!important;} .scruol{overflow:overlay!important;}</style>").appendTo("head");

        $(window).on("load",function(){
            $("#betterPlayer").removeClass("jw-stretch-uniform");
            $("#betterPlayer").addClass("jw-stretch-exactfit");
            $("#betterPlayer").css("height","100vw");
            $("body").attr("style","overflow:hidden;")
        });

        $(".container").css("margin-left",0);
        $("iframe").css({width:"100vw",height:"100vh"});
        $("#qualitiesColumn,#episodeToggle,.pb-3,.py-4,.infos_left,#launcherBg,.mt-5,.alert").remove();
        jwplayer().setConfig(
            {
                "autostart":"viewable"
            }
        );

        $(window.parent).on('mousedown' ,function (e) {
            //    window.alert(e.which)
            if(e.which==5){
                    //console.log(window.parent.location.href)
                    jwplayer().seek(jwplayer().getDuration())

            }
        });
        $(window, window.parent).on('keyup' ,function (e) {
            //    window.alert(e.which)
            if(e.which==90){
                if (window.location.href != "https://betteranime.net/" ){
                    //console.log(window.parent.location.href)
                    jwplayer().seek(jwplayer().getDuration())
                    console.log( "TeclaZ")

                }
            }
        });
        let mousee=0;
        $(window).on("mousemove",function(e) {
            if(mousee==0){
                window.parent.$("body").attr("style","overflow:visible;")
                console.log("movendo1")
                mousee=1;
                setTimeout(function() {
                    window.parent.$("body").attr("style","overflow:hidden;")
                    mousee=0;
                    console.log("parou1")

                }, 10000);
            }


        });
        let mousee2=0;
        window.parent.$("*").on("mousemove",function(e) {
            if(mousee2==0){
                mousee2=1;

                window.parent.$("body").attr("style","overflow:visible;")
                console.log("movendo2")
                setTimeout(function() {
                    window.parent.$("body").attr("style","overflow:hidden;")
                    console.log("parou2")
                    mousee2=0;

                }, 10000);
            }


        });

        jwplayer().on('complete', function(){

            if (window.parent.location.href.includes("episodio") ){
                // window.alert(window.parent.location.href)
                let proximo = window.parent.location.href;
                proximo = proximo.split("episodio-")
                proximo[1]++
                if(proximo[1]<10){
                    proximo[1]="0"+proximo[1];
                }
                window.parent.location.href= (proximo[0] + "episodio-" + proximo[1]);
                //  console.log(proximo[1])

            }


        });
        //pular antes do fim do fechamento
        let testedetempo=true
        jwplayer().on('time', function(event){

            if($(".ba-skipIntro").is(":visible")){
                $(".ba-skipIntro").trigger("click");
            }

            if($(".ba-resume").is(":visible")){
                $(".ba-resume").parent().remove();
            }
            $("#message,.message").remove();

            if (window.parent.location.href.includes("sword-art") ){
                if((event.duration-event.position)< 93 && testedetempo == true){
                    jwplayer().seek(event.duration)
                    testedetempo=false;
                }
            }
        });
    }
})();




