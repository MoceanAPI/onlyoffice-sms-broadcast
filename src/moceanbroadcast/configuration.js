(function(window, undefined){
    var text = "Hello world!";
    window.Asc.plugin.init = function() {
        $('#MOCEAN_API_BROADCAST_KEY').val(localStorage.getItem("MokeanKey"));
        $('#MOCEAN_API_BROADCAST_SECRET').val(localStorage.getItem("MokeanSecret"));
    };
    window.Asc.plugin.button = function(id)
    {
        if (id == 0)
        {
			MokeanKey = $('#MOCEAN_API_BROADCAST_KEY').val();
			MokeanSecret = $('#MOCEAN_API_BROADCAST_SECRET').val();
			localStorage.setItem("MokeanKey", MokeanKey);
			localStorage.setItem("MokeanSecret", MokeanSecret);
			 this.executeCommand("close", "");
        } else {
			 this.executeCommand("close", "");
		}
    };
})(window, undefined);