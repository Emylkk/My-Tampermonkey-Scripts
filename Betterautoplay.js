// ==UserScript==
// @name         MouseClickEP
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Emylkk
// @match        https://betteranime.net/*
// @grant        none
// @require https://code.jquery.com/jquery-3.6.0.js
// ==/UserScript==
(function () {
    var skiped = 0;
    var countering = 0;
    let mousee = 0;
    let mousee2 = 0;
    let mousee3 = 0;
    let testedetempo = true

    if (window.location.href.includes("disqus")) {
    }
    $(window).on("mousewheel", function (e) {
        if (mousee == 0) {
            window.parent.$("body").attr("style", "overflow:visible;")
            $("body").attr("style", "overflow:visible;")
            console.log("movendo1")
            mousee = 1;
            setTimeout(function () {
                window.parent.$("body").attr("style", "overflow:hidden;")
                mousee = 0;
                console.log("parou1")

            }, 10000);
        }


    });
    //******************************************************** PLAYER ********************************************************
    if (window.location.href.includes("/player")) {

        $(window).on("load", function () {

            $(".reaction-items").css("display", "none");
            $("#betterPlayer").removeClass("jw-stretch-uniform");
            $("#betterPlayer").addClass("jw-stretch-exactfit");
            $("#betterPlayer").css("height", "100vw");

        });
        jwplayer().setConfig(
            {
                "autostart": "viewable"
            }
        );

        jwplayer().on('complete', function () {
            if (window.parent.$(".fa-arrow-right").length > 0) {
                if (window.parent.location.href.includes("episodio")) {
                    proximo(window.parent);
                }
            }

        });
        //pular antes do fim do fechamento
        jwplayer().on('time', function (event) {
            window.parent.$("#indicator-south").remove();


            if (skiped == 0 && $(".ba-skipIntro").is(":visible")) {
                skiped = 1;
                $(".ba-skipIntro").trigger("click");
            }

            if ($(".ba-resume").is(":visible")) {
                setTimeout(function () {

                    $(".ba-resume").parent().remove();
                }, 5000);
            }


            if (window.parent.location.href.includes("zodiaco")) {
                if ((event.duration - event.position) < 53 && testedetempo == true) {
                    proximo(window.parent);
                    testedetempo = false;
                }
            }
        });
        //Avança o Ep Apertando Z
        $(window).on('keyup', function (e) {
            console.log("avancar?")
            if (e.which == 90) {
                proximo(window.parent);
            }
        });
    }


    //******************************************************** SITE ********************************************************
    if (window.location.href.includes("/episodio")) {
        // window.alert(window.location.href)
        $("body").attr("style", "overflow:hidden;")
        $("#disqus_thread").css({'position':'relative',"bottom":"-40vh","overflow":'visible','height':'30vh'})
        $("footer").css("bottom", "-100vh");
        $("<style type='text/css'> .notScruol{overflow:hidden!important;} .scruol{overflow:overlay!important;}</style>").appendTo("head");
        $(".container").css("margin-left", 0);
        $("iframe").css({ width: "100vw", height: "100vh" });
        $("#qualitiesColumn,#episodeToggle,.py-4,.infos_left,#launcherBg,.mt-5,.alert").remove();
        $(".pb-3").css({ "position": "absolute", "bottom": "-15vh" });

        //------------------ Avança o Ep Apertando Z --------------------
        $(window).on('keyup', function (e) {
            if (e.which == 90) {
                if (window.location.href != "https://betteranime.net/") {
                    proximo(window.parent);
                }
            }
        });

        $(window).on("mousewheel", function (e) {
            if (mousee2 == 0) {
                mousee2 = 1;
                window.parent.$("body").attr("style", "overflow:visible;")
                console.log("movendo2")
                setTimeout(function () {
                    window.parent.$("body").attr("style", "overflow:hidden;")
                    console.log("parou2")
                    mousee2 = 0;
                }, 10000);
            }
        });
        window.parent.$("#conversation").on("mousewheel", function (e) {
            if (mousee3 == 0) {
                mousee3 = 1;
                window.parent.$("body").attr("style", "overflow:visible;")
                console.log("movendo3")
                setTimeout(function () {
                    window.parent.$("body").attr("style", "overflow:hidden;")
                    console.log("parou3")
                    mousee3 = 0;

                }, 10000);
            }
        });

    }

    //funçoes sem window definida

    function proximo(windowinstance) {
        console.log("proximo")
        let proximo = windowinstance.location.href.match(/\d+/g);
        console.log(proximo)
       let novo=proximo[proximo.length-1]++
        console.log(novo)

        if (novo < 10) {
            novo = "0" + novo;
        }

       windowinstance.location.href=windowinstance.location.href.replace(novo,proximo)

    }
})();

