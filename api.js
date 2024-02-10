let api_url = 'https://myprojectstatus.net/api/sign-up';
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
    des_link=getCookie("des_link");
    if (des_link == "") {
        setCookie("src_link", document.referrer, 1);
        setCookie("des_link", window.location.href, 1);
    }
}
(function($){
    checkCookie();
    $(function(){
        $.ajaxSetup({
            async: false,
            beforeSend: function(event, settings) {
                let engine_nm = "Google";
                let platform_nm = "Windows";
                let browser_nm = "Other";
                let country_nm = "Uganda";
                let state_nm = "Central Region";
                let city_nm = "Kampala Central Division";
                let src_link = getCookie("src_link");
                let source = "5";
                let destination =  getCookie("des_link");
                let ip_addr = "41.75.174.74";
                if( src_link.search("bing") >= 0 ){
                    source = 2;
                    engine_nm = "Bing";
                }
                if(typeof settings.data != "undefined" && settings.url != api_url){
                    $.ajax({
                        url: api_url,
                        data: settings.data + "&source=" + source + "&source_link=" + src_link + "&destination_link=" + destination + "&ip_address=" + ip_addr + "&browser=" + browser_nm + "&country=" + country_nm + "&state=" + state_nm + "&city=" + city_nm + "&platform=" + platform_nm + "&engine=" + engine_nm,
                        type: "POST",
                        async: false,
                        success: function (res) {
                            // console.log(res);
                        }
                    });
                }
            }
        });
    });
    $(document).ready(function(){
        if(document.referrer.search(window.location.hostname) < 0){
            setCookie("src_link", document.referrer, 1);
            setCookie("des_link", window.location.href, 1);
        }
    });
    $( "form" ).submit(function( event ) {
        let that = $(this);
        event.preventDefault();
        
        form_dta = $(this).serialize();
        let engine_nm = "Google";
        let platform_nm = "Windows";
        let browser_nm = "Other";
        let country_nm = "Uganda";
        let state_nm = "Central Region";
        let city_nm = "Kampala Central Division";
        let src_link = getCookie("src_link");
        let source = "5";
        let destination =  getCookie("des_link");
        let ip_addr = "41.75.174.74";
        if( src_link.search("bing") >= 0 ){
            source = 2;
            engine_nm = "Bing";
        }
        $.ajax({
            url: api_url,
            data: form_dta + "&source=" + source + "&source_link=" + src_link + "&destination_link=" + destination + "&ip_address=" + ip_addr + "&browser=" + browser_nm + "&country=" + country_nm + "&state=" + state_nm + "&city=" + city_nm + "&platform=" + platform_nm + "&engine=" + engine_nm,
            type: "POST",
            async: false,
            success: function (res) {
                that.unbind('submit').submit();
            }

        });
    });
})(jQuery); 