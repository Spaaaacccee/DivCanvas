window.addEventListener('load', function(e) {
    //onload
    //SETTINGS
    //Anti-aliasing
    var aa = true   ;
    //Progressive Refine
    var progressive = true;
    var stage = document.getElementById('stage');
    var defaultColor = 'hsl(255,1,0.5)';
    //ENGINE
    var createTiles = function(x, y) {
        for (var i = 0; i < x; i++) {
            for (var j = 0; j < y; j++) {
                var tile = document.createElement('div');
                tile.className = 'gameTile';
                tile.dataset.x = i;
                tile.dataset.y = j;
                tile.style.width = 1 / x * 100 + '%';
                tile.style.height = 1 / y * 100 + '%';
                tile.style.left = (i / x) * 100 + '%';
                tile.style.top = (j / y) * 100 + '%';
                stage.appendChild(tile);
                //console.log("created gameTile at " + i + ", " + j);
            }
        }
    };

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    function toDegrees(angle) {
        return angle * (180 / Math.PI);
    }
    
    var queue = {
        checked:0,
        item:function(string,status){
            this.str = string;
            this.stat = status
        },
        list:[],
        add:function(str){
            queue.checked = 0;
            var it = new queue.item(str,0);
            queue.list.push(it);
            console.log("added " + it.str);
        },
        check:function(str){
            console.log("checking " + str);
            for(i=0;i<queue.list.length;i++) {
                if(queue.list[i].str == str) {
                queue.list[i].status = 1;
                console.log();
                    
                    var remaining = 0;
                    
                    
                }
            }
            
            for(i=0;i<queue.list.length;i++) {
                if(queue.list[i].str == 1) {
                    remaining = 1;
            return;
                }
            }
                    if(queue.checked == 0 && remaining == 0) {
                    console.log("all done");
                    queue.checked = 1;
                    return;}
                    
            return;
        },
        
    }

    function poke(x, y) {
        xr = Math.round(x);
        yr = Math.round(y);
        if (document.querySelector('[data-x="' + xr + '"][data-y="' +
            yr + '"]')) {
            var targetTile = document.querySelector('[data-x="' +
                xr + '"][data-y="' + yr + '"]');
            //console.log('successfully selected tile @ ' + xr + ', ' + yr);
            //targetTile.style.border = "1px solid red";
            targetTile.style.background = "black";
        }
        //ANTI-ALIASING
        if (aa == true) {
            if (xr > x) {
                if (document.querySelector('[data-x="' + (xr - 1) +
                    '"][data-y="' + yr + '"]')) {
                    targetTileAax = document.querySelector(
                        '[data-x="' + (xr - 1) + '"][data-y="' +
                        yr + '"]');;
                }
            } else {
                if (document.querySelector('[data-x="' + (xr + 1) +
                    '"][data-y="' + yr + '"]')) {
                    targetTileAax = document.querySelector(
                        '[data-x="' + (xr + 1) + '"][data-y="' +
                        yr + '"]');;
                }
            }
            if (yr > y) {
                if (document.querySelector('[data-x="' + xr +
                    '"][data-y="' + (yr - 1) + '"]')) {
                    targetTileAa = document.querySelector(
                        '[data-x="' + xr + '"][data-y="' + (yr -
                            1) + '"]');;
                }
            } else {
                if (document.querySelector('[data-x="' + xr +
                    '"][data-y="' + (yr + 1) + '"]')) {
                    targetTileAa = document.querySelector(
                        '[data-x="' + xr + '"][data-y="' + (yr +
                            1) + '"]');
                }
            }
            if (typeof targetTileAa !== 'undefined' && targetTileAa
                .style.background != "black") {
                var ly = (yr - y);
                ly = -ly > 0 ? -ly : ly;
                targetTileAa.style.background = "rgba(0,0,0,1)";
                if (targetTileAa.style.opacity <= ly) {
                    targetTileAa.style.opacity = ly;
                }
            }
            if (typeof targetTileAax !== 'undefined' &&
                targetTileAax.style.background != "black") {
                var lx = (xr - x);
                lx = -lx > 0 ? -lx : lx;
                targetTileAax.style.background = "rgba(0,0,0,1)";
                if (targetTileAax.style.opacity <= lx) {
                    targetTileAax.style.opacity = lx;
                }
            }
            if (document.querySelector('[data-x="' + xr +
                '"][data-y="' + yr + '"]')) {
                var targetTile = document.querySelector('[data-x="' +
                    xr + '"][data-y="' + yr + '"]');
                //console.log('successfully selected tile @ ' + xr + ', ' +yr);
                var reliability = 1 - ((Math.abs(xr - x) + Math.abs(
                        yr - y)) / 2)
                    //targetTile.style.border = "1px solid red";
                targetTile.style.background = "rgba(0,0,0,1)";
                targetTile.style.opacity = reliability;
            }
        }
    }
    var draw = {
        line: function(ptax, ptay, ptbx, ptby,verbose) {
            queue.add("line"+ptax+ ptay+ ptbx+ ptby+verbose);
            function startDraw(iterations) {
                //var pta = document.querySelector('[data-x="' +
                //ptax + '"][data-y="' + ptay + '"]');
                //var ptb = document.querySelector('[data-x="' +
                //ptbx + '"][data-y="' + ptby + '"]');
                var distance = Math.sqrt(Math.abs(Math.pow(
                    (ptax - ptbx), 2)) + Math.abs(
                    Math.pow((ptay - ptby), 2)));
                console.log(distance);
                if (!iterations) {
                    iterations = distance;
                }

                function drawEdge() {
                    if(verbose){console.log(
                        "Starting to draw line from " +
                        ptax + ', ' + ptay + ' to ' +
                        ptbx + ', ' + ptby)};
                    var i = 0;
                    var j = 0;
                    var ite = 0;
                    function step() {
                        poke(ptax + i, ptay + j);
                        
                        i = i + (ptbx - ptax) /
                            iterations;
                        j = j + (ptby - ptay) /
                            iterations;
                        if (i < (ptbx - ptax) || j < (ptby - ptay)) {
                            window.requestAnimationFrame(
                                step);
                        } else {
                                
                                if(verbose) {console.log("Done drawing line from " +
                                ptax + ', ' +
                                ptay + ' to ' +
                                ptbx + ', ' +
                                ptby)};
                            queue.check("line"+ptax+ ptay+ ptbx+ ptby+verbose);
                        }
                    }
                    window.requestAnimationFrame(step);
                }
                drawEdge();
            }
            startDraw();
        },
        circle: function(radius, cx, cy, ite) {
            queue.add("circle"+radius+ cx+ cy+ ite);
            console.log(
                "Starting to draw circle with radius of " +
                radius + " @ " + cx + ', ' + cy);

            function startDraw(it, last) {
                poke(cx, cy);
                poke(cx + radius, cy);
                poke(cx, cy + radius);
                poke(cx - radius, cy);
                poke(cx, cy - radius);

                function drawEdge(iterations) {
                    if (1) {
                        var i = 0;

                        function step() {
                            var ex = radius * Math.cos(
                                toRadians(i));
                            var ey = radius * Math.sin(
                                toRadians(i));
                            i = i + 360 /
                                iterations;
                            poke(ex + cx, ey + cy);
                            if (i < 360) {
                                requestAnimationFrame
                                    (step)
                            } else {
                                if (last) console.log(
                                    "Done drawing circle with radius of " +
                                    radius +
                                    " @ " + cx +
                                    ', ' + cy);
                                queue.check("circle"+radius+ cx+ cy+ ite);
                            };
                        }
                        requestAnimationFrame(step);
                    } else {
                        console.log(
                            "360 must be divisible by the number of iterations"
                        );
                    }
                }
                drawEdge(it);
            }
            if (progressive) {
                startDraw(ite / 32, 0);
                startDraw(ite / 16, 0);
                startDraw(ite / 8, 0);
                startDraw(ite / 4, 0);
                startDraw(ite / 2, 0);
                startDraw(ite, 1);
            } else {
                startDraw(ite);
            }
        },
        rectangle: function(cx, cy, h, w) {
            
            console.log(
                        "Starting to draw rectangle with size of " +
                        w + ', ' + h + ' @ ' +
                        cx + ', ' + cy);
            
            poke(cx - (w / 2), cy - (h / 2));
            poke(cx + (w / 2),cy - (h / 2));
            poke(cx - (w / 2), cy + (h / 2));
            poke(cx + (w / 2),cy + (h / 2));
            
            draw.line(cx - (w / 2), cy - (h / 2), cx + (w / 2),
                cy - (h / 2));
            draw.line(cx - (w / 2), cy + (h / 2), cx + (w / 2),
                cy + (h / 2));
            draw.line(cx - (w / 2), cy - (h / 2), cx - (w / 2),
                cy + (h / 2));
            draw.line(cx + (w / 2), cy - (h / 2), cx + (w / 2),
                cy + (h / 2));
        }
    };
    //COMMANDS
    createTiles(201, 201);
    draw.circle(99, 100, 100, 720);
    draw.circle(13, 100, 100, 180);
    draw.circle(42, 150, 150, 270);
    draw.line(2, 4, 100, 200);
    draw.rectangle(100, 100, 100, 100);
}, false);