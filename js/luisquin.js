$(window).on('showpassage', function(){
	console.log('showpassage event', window.passage.name);
	if (!story.state.isWrapperPresent) {
		$("body").prepend("<div id='wrapper'></div>");
		$("#wrapper").append("<div id='fake-passage'></div>");
		$("#fake-passage").hide();
        $("#wrapper").append("<div id='event-window'></div>");
		$("#event-window").hide();
        $("#wrapper").append("<div id='info-panel'></div>");
        $("#wrapper").append("<div id='habilities-panel'></div>");
        $("#wrapper").append("<div id='map-panel'></div>");
        document.luisquin.init();
		story.state.isWrapperPresent = true;
	}
});

$(window).on('showpassage:after', function(){
	console.log('showpassage:after event', window.passage.name, passage.tags);
    console.log("passage has tag multi?", document.luisquin.passageHasTag(window.passage.name, "multi"));
    console.log("passage has tag clock?", document.luisquin.passageHasTag(window.passage.name, "clock"));
    
    document.luisquin.checkIfTimePasses();
    
	var $el = $("#passage");
	$("#passage").remove();
	$("#wrapper").append($el);
    $("#passage").children().each(function(i) {
        $(this).hide();
    });
    $("#passage").show();
    $("#passage").children().each(function(index) {
        //console.log(index, $(this).text().match(/\w{1}/g).length, $(this).text());
        var countWords = $(this).text().match(/\s{1}/g);
        if (countWords) {
            countWords = countWords.length;
        } else {
            countWords = 0;
        }
        $(this).delay((index+1)*1000).fadeIn(1500 + countWords*10);
    });
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
        story.state.hero.src = "http://www.luisquin.es/lq/laCuentaAtras/img/hero.png";
        story.state.hero.setAttribute("id", "hero");
        story.state.hero.setAttribute("style", "left: " + story.state.heroCoords[story.state.lastMap].x + "px; top: " + story.state.heroCoords[story.state.lastMap].y + "px;");
        
        story.state.map = {
            down_floor: new Image(),
            up_floor: new Image()
        };
        story.state.map.down_floor.src = "http://www.luisquin.es/lq/laCuentaAtras/img/down_floor.png";
        story.state.map.down_floor.setAttribute("class", "map-image");
        story.state.map.down_floor.setAttribute("id", "down_map");
        story.state.map.up_floor.src = "http://www.luisquin.es/lq/laCuentaAtras/img/up_floor.png";
        story.state.map.up_floor.setAttribute("class", "map-image");
        story.state.map.up_floor.setAttribute("id", "up_map");
        
        story.state.objects = "";  // when full, is equal to "tzcpfse" in any possible order 
        story.state.objectImages = {
            t: new Image(),
            z: new Image(),
            c: new Image(),
            p: new Image(),
            f: new Image(),
            s: new Image(),
            e: new Image()
        };
        story.state.objectImages.t.src = "http://www.luisquin.es/lq/laCuentaAtras/img/t.png";
        story.state.objectImages.z.src = "http://www.luisquin.es/lq/laCuentaAtras/img/z.png";
        story.state.objectImages.c.src = "http://www.luisquin.es/lq/laCuentaAtras/img/c.png";
        story.state.objectImages.p.src = "http://www.luisquin.es/lq/laCuentaAtras/img/p.png";
        story.state.objectImages.f.src = "http://www.luisquin.es/lq/laCuentaAtras/img/f.png";
        story.state.objectImages.s.src = "http://www.luisquin.es/lq/laCuentaAtras/img/s.png";
        story.state.objectImages.e.src = "http://www.luisquin.es/lq/laCuentaAtras/img/e.png";
        for (var obj in story.state.objectImages) {
            story.state.objectImages[obj].setAttribute("id", "object_" + obj);
            story.state.objectImages[obj].setAttribute("width", "32px");
            story.state.objectImages[obj].setAttribute("height", "32px");
        };
        
        story.state.clockImage = new Image();
        story.state.clockImage.src = "http://www.luisquin.es/lq/laCuentaAtras/img/hourglass.gif";
        
        story.state.clocks = [];
        story.state.numClocks = 15;
        
        for (q=story.state.numClocks; q--;) {
            var clk = new Image();
            clk.src = "http://www.luisquin.es/lq/laCuentaAtras/img/hourglass-icon.png";
            story.state.clocks.push(clk);
        }
        
        story.state.alreadyVisited = [];
        for (var q=story.passages.length-1; q--;) {
            story.state.alreadyVisited[q] = false;
        }
        console.log(story.state.alreadyVisited);
        
        $("#info-panel").children().each(function(i) {
            $(this).remove();
        });
        for (q=story.state.numClocks; q--;) {
            $("#info-panel").append(story.state.clocks[q]);
        }
        $("#info-panel").children().each(function(i) {
            $(this).attr("id", "clockIcon"+i);
            $(this).attr("width", "32px");
            $(this).attr("height", "32px");
        });
        $("#info-panel").append("<div id='info-panel-title'>Tiempo</div>");
        
        story.state.habilities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        $("#habilities-panel").children().each(function(i) {
            $(this).remove();
        });
        $("#habilities-panel").append("<div id='habilities-panel-title'>Habilidad (#)</div>");
        for (q=0; q<story.state.habilities.length; q++) {
            $("#habilities-panel").append("<span class='numberBtn noHover' id='habPanel_" + story.state.habilities[q] + "'>"+story.state.habilities[q]+"</span>");
        }
        $("#habilities-panel").append("<span id='lives'></span>");
        $("#habilities-panel").append("<div id='habilities-panel-title2'>Vidas</div>");
        story.state.lives = [];
        story.state.numLives = 5;
        for (q=story.state.numLives; q--;) {
            var heart = new Image();
            heart.src = "http://www.luisquin.es/lq/laCuentaAtras/img/heart-icon.png";
            story.state.lives.push(heart);
        }
        $("#lives").children().each(function(i) {
            $(this).remove();
        });
        for (q=story.state.numLives; q--;) {
            $("#lives").append(story.state.lives[q]);
        }
        $("#lives").children().each(function(i) {
            $(this).attr("id", "life_"+i);
            $(this).attr("width", "32px");
            $(this).attr("height", "32px");
        });
    },
    
    checkExits: function() {
        $("#passage a").each(function(index) {
            var exit = $(this).attr("data-passage");
            if (exit === "X") {
                $(this).removeAttr("data-passage");
                $(this).attr("href", "javascript:document.luisquin.solveMistery("+passage.name+")");
            } else if (exit === "#") {
                $(this).removeAttr("data-passage");
                $(this).attr("href", "javascript:document.luisquin.launchHabilitySelection("+passage.name+")");
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
                console.error(exit, " parece haber sido visitada con anterioridad.");
            }
        });
    },
    
    checkIfTimePasses: function() {
        if (document.luisquin.passageHasTag(passage.name, "clock")) {
            $("#event-window").append("<div id='clock'></div>");
            $("#clock").append(story.state.clockImage);
            $("#event-window").fadeIn(750).delay(2000).fadeOut(750, function() {
                $("#clock").remove();
                document.luisquin.decrementClock();
            });
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
            $("#clockIcon"+story.state.numClocks).fadeOut(1500, function() {
                $(this).remove();
            });
        }
    },
    
    decrementLives: function(dmg) {
        dmg = Number(dmg);
        story.state.numLives -= dmg;
        var count = 0;
        while (dmg > 0) {
            console.log(">", dmg);
            $("#lives>img:eq("+count+")").delay(count*1000).fadeOut(1000, function() {
                $(this).remove();
                if ($("#lives").children().length === 0) {
                    console.log("dead!");
                    story.show(73); // ending by health damage
                }
            });
            count++;
            dmg--;
        }
    },
    
    drawMap: function() {
        var currentPsg = Number(window.passage.id);
        console.log("currentPSG: ", currentPsg);
        if (currentPsg <= 2) return;
        var $map = $("#map-panel");
        if (currentPsg == 8) {
            $map.append(story.state.map["down_floor"]).append("<br />").append(story.state.map["up_floor"]).addClass("map-collapsed");
            $("#map-panel").unbind("click");
            $("#map-panel").click(function(ev) {
                if ($map.hasClass("map-collapsed")) {
                    $map.removeClass("map-collapsed");
                } else {
                    $map.addClass("map-collapsed");
                }
            });
            return;
        }
        
        var whichPassage = Number(passage.name);
        if (whichPassage && story.state.heroCoords[whichPassage]) story.state.lastMap = whichPassage;
        var currMap = story.state.heroCoords[story.state.lastMap].map;
        var oppMap = currMap === "up" ? "down" : "up";
        
        console.log("hiding:", $("#"+oppMap+"_map"));
        $("#"+oppMap+"_map").hide(750, function() {
            console.log("hiding complete!");
            $("#"+oppMap+"_map").remove();
            $("#map-panel>br").remove();
            $map.append(story.state.map[currMap + "_floor"]).append(story.state.hero).addClass("map-collapsed");
            $(".map-image").show(750);
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
    
    launchHabilitySelection: function(psgName) {
        var s = story.state;
        $("#event-window").append("<div id='hability-selection'></div>").css("opacity", 0.9);
        for (var q=0; q<story.state.habilities.length; q++) {
            $("#hability-selection").append("<button class='numberBtn' id='hab_" + story.state.habilities[q] + "'>"+story.state.habilities[q]+"</button>");
            $("#hab_" + story.state.habilities[q]).bind("click", {index: story.state.habilities[q]}, function(ev, data) {
                document.luisquin.useHability(ev.data.index);
            });
        }
        $("#hability-selection").append("<button class='numberBtn' id='close-hability-selection'>X</div>");
        $("#close-hability-selection").bind("click", function(ev, data) {
            $("#event-window").fadeOut(750, function() {
                $("#event-window").css("opacity", 0.75);
                $("#hability-selection").remove();
            });
        });
        $("#event-window").fadeIn(750);
    },
    
    moveHero: function() {
        var coords = story.state.heroCoords[window.passage.name] || null;
        var $map = $("#map-panel");
        if (coords) {
            $map.children().each(function(i) {
                if ($(this).attr("id") === "hero") {
                    console.log("removing...", $(this));
                    $(this).remove();
                }
            });
            $map.append(story.state.hero);
            $("#hero").animate({
                left:   coords.x+"px",
                top:    coords.y+"px"
            }, 
            1500, 
            function() {
                // Animation complete.
                console.log("hero animation complete!");
            });
        } else {
            console.log("not moving hero");
        }
    },
    
    onLetterClicked: function(letter) {
        letter = letter.toLowerCase();
        console.log("letter:", letter);
        $("#solution-text").text($("#solution-text").text() + letter);
        console.log(letter, story.state.letterCodes[letter]);
        $("#solution-number").text(parseInt($("#solution-number").text()) - story.state.letterCodes[letter]);

        if (++story.state.currentPos > story.state.solution.length-1) {
            console.log("should end!");
            $(".letterBtn").remove();
            if ($("#solution-text").text() === story.state.solution) {
                console.log("Hemos acertado!!!");
                $("#event-window").fadeOut(750, function() {
                    $("#event-window").css("opacity", 0.75);
                    $("#hability-selection").remove();
                    $("#solution-panel").remove();
                    document.luisquin.removePassageTags(story.state.toRemove);
                    story.show(Number(story.state.success)+1);
                });
            }
            return;
        }
        var letterOptions = document.luisquin.createLetterOptions(story.state.solution.charAt(story.state.currentPos));
        $(".letterBtn").remove();
        for (var w=0; w<letterOptions.length; w++) {
            $("#hability-selection").prepend("<button class='numberBtn letterBtn' id='letter_" + letterOptions[w] + "'>" + letterOptions[w] + "</button>");
            $("#letter_" + letterOptions[w]).unbind("click").bind("click", {letter: letterOptions[w]}, function(ev, data) {
                console.log("clicked " + ev.data.letter);
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
    
    recoverHability: function() {
        for (var q = 0; q<10; q++) {
            console.log("comprobando", q, story.state.habilities[q])
            if (story.state.habilities[q] !== q+1) {
                console.log("no es igual a", q+1);
                story.state.habilities.splice(q, 0, q+1);
                $("#habilities-panel").append("<span class='numberBtn noHover' id='habPanel_" + (q+1) + "'>"+(q+1)+"</span>");
                $("#habPanel_"+(q+1)).hide().fadeIn(1500);
                break;
            }
        }
    },
    
    removeHability: function(habNumber) {
        for (var q = 0; q < story.state.habilities.length; q++) {
            if (story.state.habilities[q] === habNumber) {
                story.state.habilities.splice(q, 1);
                break;
            }
        }
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
    
    solveMistery: function(psgName) {
        var s = story.state;
        /*
        var answer = prompt("¿Cuál es la respuesta? " + s.solution + " " + s.success + " " + s.failure);
        if (String(answer).toLocaleLowerCase() === s.solution) {
            document.luisquin.removePassageTags(s.toRemove);
            story.show(Number(s.success)+1);
        } else {
            story.show(Number(s.failure)+1);
        }
        */
        story.state.currentPos = 0;
        $("#event-window").append("<div id='hability-selection'></div>").css("opacity", 0.9);
        var letterOptions = document.luisquin.createLetterOptions(s.solution.charAt(story.state.currentPos));
        for (var w=0; w<letterOptions.length; w++) {
            $("#hability-selection").append("<button class='numberBtn letterBtn' id='letter_" + letterOptions[w] + "'>" + letterOptions[w] + "</button>");
            $("#letter_" + letterOptions[w]).unbind("click").bind("click", {letter: letterOptions[w]}, function(ev, data) {
                console.log("clicked " + ev.data.letter);
                document.luisquin.onLetterClicked(ev.data.letter);
            });
        }
        $("#event-window").append("<div id='solution-panel'><span id='solution-text'></span>&nbsp;<span id='solution-number'>" + document.luisquin.sumLetters(s.solution) + "</span></div>");
        $("#hability-selection").append("<button class='numberBtn' id='close-hability-selection'>X</div>");
        $("#close-hability-selection").bind("click", function(ev, data) {
            $("#event-window").fadeOut(750, function() {
                $("#event-window").css("opacity", 0.75);
                $("#hability-selection").remove();
                $("#solution-panel").remove();
                story.show(Number(s.failure)+1);
            });
        });
        $("#event-window").fadeIn(750);
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
        $("#info-panel").append(story.state.objectImages[obj]);
        if (!pause || isNaN(pause)) pause = 0;
        story.state.objects += obj;
        $("#object_"+obj).hide().delay(pause).fadeIn(1500);
    },
    
    useHability: function(habNumber) {
        document.luisquin.removeHability(habNumber);
        $("#habPanel_" + habNumber + ", #hab_" + habNumber).fadeOut(750, function() {
            $(this).remove();
        });
        story.state.habilityInUse = habNumber;
        $("#event-window").delay(750).fadeOut(750, function() {
            $("#event-window").css("opacity", 0.75);
            $("#hability-selection").remove();
            $("#solution-panel").remove();
            console.log("going to ", story.state.habilityTarget+1);
            story.show(Number(story.state.habilityTarget+1));
        });
    }
};