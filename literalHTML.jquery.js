/*
 * literalHTML
 * (c) James Padolsey
 * http://james.padolsey.com
 *
 * Adds the ability to specify inline HTML in your JavaScript
 *   e.g.
 *      var myDiv = |<div id="something"><strong>Boo!</strong></div>|;
 *
 * The pipe ('|') is the delimiter, you must escape (\) all pipes
 * existing within the enclosed HTML.
 *
 * jQuery is required.
 *
 * Scripts using this feature must be of the type, "text/javascript:literalHTML"
 *   e.g.
 *      <script type="text/javascript:literalHTML">
 *      
 *          var structure = |
 *              <ul>
 *                  <li>Item 1</li>
 *                  <li>Item 2</li>
 *                  <li>Item 3</li>
 *              </ul>
 *          |;
 *          
 *          $('body').append(structure);
 *          
 *      <script>
 *      
 * Note: the script below must go in a SCRIPT tag of the regular type.
 */

jQuery(function($){
    
    function parse(script) {
        var htmlPatt = /\|\s*(<\w+(?:\\\||.)+?)\|/g;
        return script.replace(/(\n|\r\n)/g,'').replace(htmlPatt, function($0, $1) {
            return 'jQuery("' + $1
                        .replace(/"/g,'\\"')
                        .replace(/\{(.+?)\}/, '"+$1+"')
                    + '")[0]';
        });
    }
    
    $('script[type$=":literalHTML"]').each(function(){
        var src = $(this).attr('src');
        if (src) {
            $.ajax({
                url : src, async : false,
                success : function(data) {
                    parsed = parse(data);
                }
            });
        }
        var parsed = parsed || parse($(this)[0].innerHTML);
        $.globalEval(parsed);
    });
    
});