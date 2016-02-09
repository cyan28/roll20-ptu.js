damageRolls=["1d6+1", "1d6+3", "1d6+5", "1d8+6", "1d8+8", "2d6+8", "2d6+10", "2d8+10", "2d10+10", "3d8+10", "3d10+10", "3d12+10", "4d10+10", "4d10+15", "4d10+20", "5d10+20", "5d12+25", "6d12+25", "6d12+30", "6d12+35", "6d12+40", "6d12+45", "6d12+50", "6d12+55", "6d12+60", "7d12+65", "8d12+70", "8d12+80"];

on("chat:message", function(msg) {
    if(msg.type == "api" && !isNaN(msg.content.substr(1,1))) {
        parsing = msg.content.split(" ")[0];
        oparse = parsing
        rest = msg.content.replace(parsing + " ", "");
        effectiveMulti = 1;
        ind=1;
        while (parsing[parsing.length-ind] == "+" || parsing[parsing.length-ind] == "-") {
            effectiveMulti *= (parsing[parsing.length-ind] == "+") ? 2 : 0.5
            ind++
        }
        ind--
        parsing = parsing.substr(0,parsing.length-ind);
        damage = Number(parsing.substr(1));
        addToTotal = NaN;
        if(isNaN(damage)) {
            plusop = parsing.match(/[\\+\\-]/);
            plus = parsing.substr(1).indexOf(plusop);
            if(plus > -1) {
                damage = Number(parsing.substr(1, plus));
                log(damage)
                if(isNaN(damage)) return;
                addToTotal = Number(parsing.substr(plus+2));
            }
            else return;
        }
        if(damage > damageRolls.length) return;
        log(oparse + " -> " +"/roll " + damageRolls[damage-1]);
        sendChat(msg.who, "/roll (" + 
                          damageRolls[damage-1] + 
                          ") *" + effectiveMulti + 
                          (isNaN(addToTotal) ? " " : plusop + addToTotal + " ") + 
                          rest);
        if(effectiveMulti > 1) {
            sendChat("", "It's Super Effective!");
        }
        else if (effectiveMulti < 1) {
            sendChat("", "It's Not Very Effective.");
        }
    } 
});