$(window).on('showpassage', function(){
	console.log('showpassage event', window.passage.name);
	if (!story.state.isWrapperPresent) {
        //document.luisquin.startMusic();
        $("#background").addClass("backgroundImage");
        document.luisquin.init();
		story.state.isWrapperPresent = true;
	}
});

$(window).on('showpassage:after', function() {
    function setParagraphs(passage) {
        var paragraphs = [];
        var borders = [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5];
        borders = document.luisquin.shuffleArray(borders);  
        
        $el.children().each(function(i) {
            $(this).addClass("border" + borders.pop());
            paragraphs.push($(this));
            $(this).remove();
        });
        $el.css("overflow-y", "scroll");
        $el.css("height", ($(".pane").height() - $el.parent().position().top + 20)+"px");
        console.log("calculando posición textos:", $(".pane").height(), " - ", $el.parent().position().top, $(".pane").height() - $el.parent().position().top);

        $el.show();
        var count = 0;
        paragraphs.forEach(function(index) {
            var countWords = index.text().match(/\s{1}/g);
            if (countWords) {
                countWords = countWords.length;
            } else {
                countWords = 0;
            }
            $el.append(index);
            index.hide().delay((count+1)*document.luisquin.TEXT_TOUT).fadeIn(1500);
            count++;
        });
    }
    
    function checkIntroPassages() {
        var introPsg = [1, 2, 8];
        var imgPsg = [1,2,6,7,14,34,41,47,49,51,58,63,66];
        var deathImg = [61,70,73];
        if (introPsg.indexOf(Number(window.passage.id)) < 0) {
            $(".information").fadeIn("slow");
            $(".map").fadeIn("slow");
        }
        if (window.passage.id == 1) {
            setTimeout(function() {
                console.info("lanzamos ilustración intro");
                this.$scope.openModalEvents(); // abrimos la ventana de la ilustración de introducción
                $("#itemImg").attr("src", "img/evt/prologo.jpg");
            }.bind(document.luisquin), 4500);
        }
        if (window.passage.id == 33) {
            setTimeout(function() {
                console.info("lanzamos ilustración victoria");
                this.$scope.openModalEvents(); // abrimos la ventana de la ilustración de VICTORIA
                $("#itemImg").attr("src", "img/evt/win.png");
            }.bind(document.luisquin), 3500);
        }
        if (deathImg.indexOf(window.passage.id) > -1) {
            setTimeout(function() {
                console.info("lanzamos ilustración muerte");
                this.$scope.openModalEvents(); // abrimos la ventana de la ilustración de MUERTE
                $("#itemImg").attr("src", "img/evt/muerte.jpg");
            }.bind(document.luisquin), 3500);
        }
        if (imgPsg.indexOf(Number(window.passage.name)) > -1) {
            setTimeout(function() {
                console.info("lanzamos ilustración", window.passage.name);
                this.$scope.openModalEvents(); // abrimos la ventana de la ilustración de introducción
                $("#itemImg").attr("src", "img/evt/"+Number(window.passage.name)+".jpg");
            }.bind(document.luisquin), 3500);
        }
    }
    
	console.log('showpassage:after event', window.passage.name, passage.tags);
    console.info("passage has tag multi?", document.luisquin.passageHasTag(window.passage.name, "multi"));
    console.info("passage has tag clock?", document.luisquin.passageHasTag(window.passage.name, "clock"));
    
    checkIntroPassages();
    document.luisquin.checkIfTimePasses();
    
	var $el = $("#passage");
    setParagraphs($el);
    
    var whichPassage = Number(passage.name);
    if (isNaN(whichPassage)) whichPassage = 0;
    story.state.alreadyVisited[whichPassage] = true;
    document.luisquin.checkExits();
    document.luisquin.drawMap();
    document.luisquin.moveHero();
});

$(window).on('hidepassage', function() {
	console.log('hidepassage event', window.passage.name);
	var html = $("#passage").html();
	$("#passage").hide();
	$("#fake-passage").html($("#passage").html());
	$("#fake-passage").show().fadeOut(1000);
});

document.luisquin = {
    TEXT_TOUT: 1000,
    MUSIC_ON:   false,
    init: function() {
        document.story = story;
        story.state.vowels = ["a", "e", "i", "o", "u"];
        story.state.consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
        story.state.letterCodes = {
            a: 1,
            e: 2,
            i: 3,
            o: 4,
            u: 5,
            b: 6, c: 6, d: 6, f: 6,
            g: 7, h: 7, j: 7, k: 7,
            l: 8, m: 8, n: 8, ñ: 8,
            p: 9, q: 9, r: 9, s: 9,
            t: 10, v: 10, w: 10,
            x: 11, y: 11, z: 11,
        };
        
        story.state.cableCodes = [67, 62, 35, 44, 50, 4, 32];        
        story.state.cableNames = ["ΣΚΠ", "ΨΣΛ", "ΚΡΛ", "ΦΩΨ", "ΔΠΣ", "ΨΛΩ", "ΦΔΩ"];
        story.state.cableNames = document.luisquin.shuffleArray(story.state.cableNames);
        
        story.state.cables = [];
        story.state.cablesOrdered = [];
        for (var q=0; q<story.state.cableNames.length; q++) {
            story.state.cablesOrdered.push({name: story.state.cableNames[q], target: story.state.cableCodes[q]});
            story.state.cables.push({name: story.state.cableNames[q], target: story.state.cableCodes[q]});
        }
        story.state.cables = document.luisquin.shuffleArray(story.state.cables);
        console.log("cables: ", story.state.cables, story.state.cablesOrdered);
        
        story.state.heroCoords = {
            // down floor
            12: {x: 50, y: 150, map: "down"},
            22: {x: 150, y: 150, map: "down"},
            43: {x: 270, y: 150, map: "down"},
            40: {x: 420, y: 150, map: "down"},
            59: {x: 30, y: 40, map: "down"},
            17: {x: 130, y: 40, map: "down"},
            38: {x: 250, y: 40, map: "down"},
            52: {x: 380, y: 40, map: "down"},
            56: {x: 520, y: 40, map: "down"},
            5:  {x: 510, y: 280, map: "down"},
            10: {x: 370, y: 280, map: "down"},
            3:  {x: 230, y: 280, map: "down"},
            54:  {x: 70, y: 280, map: "down"},
            // up floor
            8:  {x: 50, y: 150, map: "up"},
            15: {x: 160, y: 150, map: "up"},
            25: {x: 280, y: 170, map: "up"},
            28: {x: 430, y: 170, map: "up"},
            36: {x: 70, y: 50, map: "up"},
            11: {x: 210, y: 50, map: "up"},
            39: {x: 360, y: 50, map: "up"},
            9:  {x: 510, y: 50, map: "up"},
            41: {x: 80, y: 280, map: "up"},
            31: {x: 270, y: 300, map: "up"},
            33: {x: 370, y: 290, map: "up"},
            47: {x: 510, y: 290, map: "up"},
        };
        story.state.lastMap = 12;
        
        story.state.hero = new Image();
        story.state.hero.src = "img/hero_128.png";
        story.state.hero.setAttribute("id", "hero");
        story.state.hero.setAttribute("style", "left: " + story.state.heroCoords[story.state.lastMap].x + "px; top: " + story.state.heroCoords[story.state.lastMap].y + "px;");
        
        story.state.map = {
            down_floor: new Image(),
            up_floor: new Image()
        };
        story.state.map.down_floor.src = "img/down_floor_720.png";
        story.state.map.down_floor.setAttribute("class", "map-image");
        story.state.map.down_floor.setAttribute("id", "down_map");
        story.state.map.up_floor.src = "img/up_floor_720.png";
        story.state.map.up_floor.setAttribute("class", "map-image");
        story.state.map.up_floor.setAttribute("id", "up_map");
        
        story.state.objects = "";  // when full, is equal to "tzcpfse" in any possible order 
        story.state.objectImages = {};
        story.state.objectImages.z      = "<img src='img/z.png'>";
        story.state.objectImages.c      = "<img src='img/c.png'>";
        
        story.state.objectImages.s      = "<img src='img/s.png'>";
        story.state.objectImages.s_b_img= "img/s_big.png";
        story.state.objectImages.s_big  = "img/s_big.png";
        story.state.objectImages.s_tit  = "Ácido sulfúrico";
        story.state.objectImages.s_desc = "Sustancia tóxica. No es recomendable ingerirla o que entre en contacto con la piel.";
        
        story.state.objectImages.p      = "<img src='img/p.png'>";
        story.state.objectImages.p_b_img= "img/p_big.png";
        story.state.objectImages.p_big  = "img/p_big.png";
        story.state.objectImages.p_tit  = "Lápiz óptico";
        story.state.objectImages.p_desc = "Periférico que se puede conectar a una amplia gama de equipos informáticos. ¿Quieres ser el Cervantes o el Goya del siglo XXI?";
        
        story.state.objectImages.t      = "<img src='img/t.png'>";
        story.state.objectImages.t_b_img= "img/t_big.png";
        story.state.objectImages.t_big  = "img/t_big.png";
        story.state.objectImages.t_tit  = "Casete";
        story.state.objectImages.t_desc = "Una cinta de casete que tu archienemigo ha dejado para ti. ¿Qué utilidad tiene?";
        
        story.state.objectImages.f      = "<img src='img/f.png'>";
        story.state.objectImages.f_b_img= "img/f_big.png";
        story.state.objectImages.f_big  = "img/f_big.png";
        story.state.objectImages.f_tit  = "Cloroformo";
        story.state.objectImages.f_desc = "Si te apetece echar una cabezadita, puedes inhalar un poco. Puede llegar a ser peligroso.";
        
        story.state.objectImages.e      = "<img src='img/e.png'>";
        story.state.objectImages.e_b_img= "img/e_big.png";
        story.state.objectImages.e_big  = "img/e_big.png";
        story.state.objectImages.e_tit  = "Alcohol 96º";
        story.state.objectImages.e_desc = "La utilidad médica de esta sustancia es innegable.";
        
        story.state.alreadyVisited = [];
        for (var q=story.passages.length-1; q--;) {
            story.state.alreadyVisited[q] = false;
        }
        console.log(story.state.alreadyVisited);
        
        story.state.clockImage = new Image();
        story.state.clockImage.src = "img/hourglass.gif";
        story.state.numClocks = 15;
        $("#timeIndicator h2").text(story.state.numClocks);
        
        story.state.numLives = 5;
        $("#lifeIndicator h2").text(story.state.numLives);
        
        story.state.habilities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $(".habilities").children().each(function(i) {
            $(this).show();
        });
    },
    calculateMapProportions: function() {
        if (!this.$hero) this.$hero = $("#hero");
        // el mapa tiene 720 x 417 píxeles
        var $mapImg = $(".map-image");
        if (!this.$map) this.$map = $(".map");
        var mapW = $mapImg.width();
        var mapH = ($mapImg.width() / 720 * 417) | 0;
        console.log("calculateMapProportions", $mapImg.position(), $mapImg.width(), ($mapImg.width() / 720 * 417) | 0);
        
        // el mapa original medía 635 x 359 px, calculamos las constantes de proporción
        this.kx = mapW / 635;
        this.ky = mapH / 359;
    },
    checkExits: function() {
        $("#passage a").each(function(index) {
            var exit = $(this).attr("data-passage");
            if (exit === "X") {
                $(this).removeAttr("data-passage");
                $(this).attr("onclick", "document.luisquin.solveMistery("+passage.name+")");
            } else if (exit === "#") {
                $(this).removeAttr("data-passage");
                $(this).click(passage.name, document.luisquin.launchHabilitySelection.bind(document.luisquin));
            } else if (exit === "f" || exit === "s" || exit === "e") {
                $(this).removeAttr("data-passage");
                $(this).attr("id", "lab_potion_" + exit);
                $(this).attr("href", "javascript:document.luisquin.takeLabPotion('"+exit+"')");
            } else if (exit.indexOf("dont") > -1) {
                $(this).attr("data-passage", exit.split("dont")[1]);
                var cable = story.state.cablesOrdered.shift();
                $(this).text("No cortes el cable " + cable.name + ".");
                story.state.alreadyVisited[cable.target] = true;
            } else if (exit.indexOf("cable_cut") > -1) {
                var cable = story.state.cables[index];
                $(this).attr("data-passage", cable.target);
                $(this).text(cable.name);
                exit = Number(cable.target);
            } else {
                exit = Number(exit);
            }
            if (story.state.alreadyVisited[exit] && !document.luisquin.passageHasTag(exit, "multi")) {
                $(this).addClass("closed-exit");
                $(this).removeAttr("data-passage");
                console.info(exit, " parece haber sido visitada con anterioridad.");
            }
        });
    },
    checkIfTimePasses: function() {
        if (document.luisquin.passageHasTag(passage.name, "clock")) {
            this.$scope.openModalClock();
            setTimeout(function() {
                this.$scope.closeModalClock();
            }.bind(this), 2000);
            setTimeout(function() {
                document.luisquin.decrementClock();
            }.bind(this), 2500);
        }
    },
    createLetterOptions: function(letterExcluded) {
        var NUM_OPTIONS = 4;
        var allLetters = story.state.vowels.concat(story.state.consonants);
        allLetters = document.luisquin.removeLetterFromArray(letterExcluded, allLetters);
        var whereToAddCorrectLetter = Math.floor(Math.random() * NUM_OPTIONS);
        var letterOptions = [];
        for (var q=NUM_OPTIONS; q--;) {
            if (q === whereToAddCorrectLetter) letterOptions.push(letterExcluded);
            var letter = allLetters[Math.floor(Math.random() * allLetters.length)];
            allLetters = document.luisquin.removeLetterFromArray(letter, allLetters);
            letterOptions.push(letter);
        }
        return letterOptions;
    },
    decrementClock: function() {
        story.state.numClocks--;
        if (story.state.numClocks < 0) {
            story.show(70); // ending by time run out
        } else {
            $("#timeIndicator h2").addClass("blink").fadeOut("slow", function() {
                $(this).text(story.state.numClocks);
            }).fadeIn("slow", function() {
                $(this).removeClass("blink");
            });
        }
    },
    decrementLives: function(dmg) {
        dmg = Number(dmg);
        story.state.numLives -= dmg;
        if (story.state.numLives <= 0) story.state.numLives = 0;
        $("#lifeIndicator h2").addClass("blink").fadeOut("slow", function() {
            $(this).text(story.state.numLives);
        }).fadeIn("slow", function() {
            $(this).removeClass("blink");
            if (story.state.numLives == 0) {
                console.log("dead!");
                story.show(73); // ending by health damage
            }
        });
    },
    drawMap: function() {
        var currentPsg = Number(window.passage.id);
        console.log("currentPasage: ", currentPsg);
        if (currentPsg <= 2) return;
        var $map = $(".map");
        
        var whichPassage = Number(passage.name);
        if (whichPassage && story.state.heroCoords[whichPassage]) story.state.lastMap = whichPassage;
        var currMap = story.state.heroCoords[story.state.lastMap].map;
        var oppMap = currMap === "up" ? "down" : "up";
        
        console.log("hiding:", $("#"+oppMap+"_map"));
        $("#"+oppMap+"_map").fadeOut(150, function() {
            console.log("map hiding complete!");
            $("#"+oppMap+"_map").remove();
            $map.append(story.state.map[currMap + "_floor"]).append(story.state.hero);
            $(".map-image").fadeIn(150);
        });
    },
    dropObject: function(obj, pause) {
        if (!pause || isNaN(pause)) pause = 0;
        story.state.objects = story.state.objects.replace(obj, "");
        $("#object_"+obj).delay(pause).fadeOut(1500, function() {
            $(this).remove();
        });
    },
    isVowel: function(letter) {
        for (var q=story.state.vowels.length; q--;) {
            if (story.state.vowels[q] === letter) {
                return true;
            }
        }
        return false;
    },
    launchHabilitySelection: function(ev) {
        console.log("launchHabilitySelection at", ev.data);
        console.log(this.$scope);
        var psgName = ev.data;
        this.$scope.openModalHabilities(psgName, story.state.habilities);
        $("#modal .title").text("Usa puntos de aventura");
        $("#habilitySelection .button-small").each(function(i, btn) {
            $(this).unbind("click");
            $(this).bind("click", {index: $(this).attr("id").substr(3)}, function(ev, data) {
                console.log("clicked", ev.data.index);
                document.luisquin.useHability(ev.data.index);
            });
        });
    },
    launchRecoverHabilitySelection: function(ev) {
        var remainingHabilities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        story.state.habilities.forEach(function(h, i) {
            var q=remainingHabilities.indexOf(h);
            if (q > -1) {
                remainingHabilities.splice(q, 1);
            }
        });
        if (remainingHabilities.length) {
            setTimeout(function() {
                this.$scope.openModalHabilities("dummyDesdobles", remainingHabilities);
                $("#modal .title").text("Recupera puntos de aventura");
                $("#habilitySelection .button-small").each(function(i, btn) {
                    $(this).unbind("click");
                    $(this).bind("click", {index: $(this).attr("id").substr(3)}, function(ev, data) {
                        console.log("clicked", ev.data.index);
                        document.luisquin.recoverHability(ev.data.index);
                    });
                });
            }.bind(this), 2500);
        }
    },
    loadScope: function(ionicScope) {
        console.log(ionicScope);
        this.$scope = ionicScope;
    },
    moveHero: function() {
        var coords = story.state.heroCoords[window.passage.name] || null;
        var $map = $(".map");
        if (coords) {
            $map.children().each(function(i) {
                if ($(this).attr("id") === "hero") {
                    console.log("removing...", $(this));
                    $(this).remove();
                }
            });
            $map.append(story.state.hero);
            this.calculateMapProportions();
            $hero = this.$hero;
            $hero.css("width", "64");
            $hero.css("height", "64");
            var heroX = this.$map.position().left + (coords.x*this.kx) - this.$hero.width()/4;
            var heroY = this.$map.position().top + (coords.y*this.ky) - this.$hero.height()/4;
            $hero.animate({
                left:   heroX+"px",
                top:    heroY+"px"
            }, 
            1000, 
            "linear",
            function() {
                // Animation complete.
                console.log("hero animation complete!");
                if ($hero.css("display") == "none") {
                    $hero.fadeIn("slow");
                } 
            });
        } else {
            console.log("not moving hero");
        }
    },
    onLetterClicked: function(letter) {
        letter = letter.toLowerCase();
        console.log("letter chosen:", letter);
        $("#solution-text").text($("#solution-text").text() + letter);
        console.log(letter, story.state.letterCodes[letter]);
        $("#solution-number").text(parseInt($("#solution-number").text()) - story.state.letterCodes[letter]);

        if (++story.state.currentPos > story.state.solution.length-1) {
            console.log("mistery should end now!");
            $("#letterSelection .button-small").remove();
            if ($("#solution-text").text() === story.state.solution) {
                console.log("Mistery solved!");
                this.$scope.closeModalMisteries();
                document.luisquin.removePassageTags(story.state.toRemove);
                story.show(Number(story.state.success)+1);
            } else {
                $("#letterSelection .button-small").remove();
                setTimeout(function() {
                    this.$scope.closeModalMisteries();
                    story.show(Number(story.state.failure)+1);
                }.bind(this), 1500);
            }
            return;
        }
        var letterOptions = document.luisquin.createLetterOptions(story.state.solution.charAt(story.state.currentPos));
        $("#letterSelection .button-small").remove();
        for (var w=0; w<letterOptions.length; w++) {
            var btn = '<a class="button button-small button-outline button-positive" id="letter_' + letterOptions[w] + '">'+letterOptions[w]+'</a>';
            $("#letterSelection .button-bar").append(btn);
            $("#letter_" + letterOptions[w]).unbind("click").bind("click", {letter: letterOptions[w]}, function(ev, data) {
                console.log("clicked letter " + ev.data.letter);
                document.luisquin.onLetterClicked(ev.data.letter);
            });
        }
    },
    passageHasTag: function(psgName, tag) {
        var psgNumber = Number(psgName) + 1;
        if (isNaN(psgNumber)) return false;
        var psg = story.passages[psgNumber];
        for (var q=psg.tags.length; q--;) {
            if (psg.tags[q] === tag) return true;
        }
        return false;
    },
    recoverHability: function(habNumber) {
        for (var q = 0; q<10; q++) {
            console.log("recoverHability comprobando", q, story.state.habilities[q]);
            if (story.state.habilities[q] !== q+1) {
                console.log("no es igual a", q+1);
                story.state.habilities.splice(q, 0, q+1);
                this.$scope.closeModalHabilities();
                $("#hab_"+(q+1)).hide().delay(1000).fadeIn(1500);
                break;
            }
        }
    },
    removeHability: function(habNumber) {
        console.log("removing hability", habNumber);
        for (var q = 0; q < story.state.habilities.length; q++) {
            if (story.state.habilities[q] == habNumber) {
                story.state.habilities.splice(q, 1);
                break;
            }
        }
        $("#hab_"+(habNumber)).fadeOut(1500);
    },
    removeLetterFromArray: function(letter, arr) {
        for (var q=arr.length; q--;) {
            if (arr[q] === letter) {
                arr.splice(q, 1);
                break;
            }
        }
        return arr;
    },
    removePassageTags: function(psgName) {
        var psgNumber = Number(psgName) + 1;
        if (isNaN(psgNumber)) return;
        var psg = story.passages[psgNumber];
        psg.tags = [];
    },
    resetGame: function() {
        console.log("reset game");
        $("#map-panel").children().each(function(i) {
            $(this).remove();
        });
        document.luisquin.init();
        setTimeout(function() {
            story.show(1);
        }, 750);
    },
    shuffleArray: function(input) {
        for (var i = input.length-1; i >=0; i--) {
            var randomIndex = Math.floor(Math.random()*(i+1)); 
            var itemAtIndex = input[randomIndex]; 

            input[randomIndex] = input[i]; 
            input[i] = itemAtIndex;
        }
        return input;
    },
    startMusic: function() {
        var currentTrack = 0;
        var tracks = ["bso1", "bso2", "bso3"];
        var bso = playSound(tracks[currentTrack++]);
        if (currentTrack >= 3) currentTrack = 0;
        console.log(bso);
        bso.onended = function(ev) {
            console.log(ev);
            console.log("bso track on end");
            playSound(tracks[currentTrack++]);
            if (currentTrack >= 3) currentTrack = 0;
        };
    },
    solveMistery: function(psgName) {
        console.log("solve mistery at", psgName);
        var s = story.state;
        story.state.currentPos = 0;
        var letterOptions = document.luisquin.createLetterOptions(s.solution.charAt(story.state.currentPos));
        this.$scope.openModalMisteries();
        for (var w=0; w<letterOptions.length; w++) {
            var btn = '<a class="button button-small button-outline button-positive" id="letter_' + letterOptions[w] + '">'+letterOptions[w]+'</a>';
            $("#letterSelection .button-bar").append(btn);
            $("#letter_" + letterOptions[w]).unbind("click").bind("click", {letter: letterOptions[w]}, function(ev, data) {
                console.log("clicked letter " + ev.data.letter);
                document.luisquin.onLetterClicked(ev.data.letter);
            });
        }
        $("#solution-number").text(document.luisquin.sumLetters(s.solution));
        $("#solution-text").text("");
        $("#close-button").unbind().bind("click", function(ev, data) {
            this.$scope.closeModalMisteries();
            story.show(Number(s.failure)+1);
        }.bind(this));
    },
    sumLetters: function(text) {
        var sum = 0;
        for (var q=text.length; q--;) {
            sum += story.state.letterCodes[text[q]];
        }
        return sum;
    },
    takeLabPotion: function(potion) {
        $("#lab_potion_"+potion).removeAttr("href").addClass("closed-exit");
        document.luisquin.takeObject(potion);
        if (++story.state.numPotions == 2) {
            story.show(Number(story.state.habilityTarget+1));
        }
    },
    takeObject: function(obj, pause) {
        $(".objects").append('<div class="item item-image" id="object_'+obj+'">' + story.state.objectImages[obj] + '</div>');
        if (!pause || isNaN(pause)) pause = 0;
        story.state.objects += obj;
        $("#object_"+obj).hide().delay(pause).fadeIn(1500);
        var bigImg = story.state.objectImages[obj+"_big"];
        if (bigImg) {
            var title = story.state.objectImages[obj+"_tit"];
            var desc = story.state.objectImages[obj+"_desc"];
            $("#object_"+obj).bind("click", function() {
                this.$scope.openModalObject(bigImg, title, desc);
            }.bind(this));
            setTimeout(function() {
                this.$scope.openModalObject(bigImg, title, desc);
            }.bind(this), 1500+pause);
        }
    },
    useHability: function(habNumber) {
        console.log("useHability", habNumber);
        document.luisquin.removeHability(habNumber);
        this.$scope.closeModalHabilities();
        story.state.habilityInUse = habNumber;
        console.log("going to ", story.state.habilityTarget+1);
        story.show(Number(story.state.habilityTarget+1));
    }
};