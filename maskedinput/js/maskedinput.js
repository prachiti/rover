YUI.add("maskedinput", function(Y) {


    /* Notifier class constructor */

    function MaskedInput(config) {
        MaskedInput.superclass.constructor.apply(this, arguments);
    }

    MaskedInput.NAME = "MaskedInput";
    MaskedInput.INPUT_CLASS = Y.ClassNameManager.getClassName(MaskedInput.NAME, "value");

    MaskedInput.INPUT_TEMPLATE = '<input type="text" class="' + MaskedInput.INPUT_CLASS + '">';
    MaskedInput.ATTRS = {

        mask: {
            value: "##,##,###"
        },

        maxlength: {
            value: 10
        }
    };

    MaskedInput.HTML_PARSER = {
        value: function(contentBox) {
            var node = contentBox.one("." + MaskedInput.INPUT_CLASS);
            return (node) ? parseInt(node.get("value")) : null;
        }
    };

    /* Notifier extends the base Widget class */
    Y.extend(MaskedInput, Y.Widget, {

        initializer: function() {
            
        },

        destructor: function() {

        },
        
        renderUI: function() {

            var mask = this.get('mask');
            var maxlen = this.get('maxlength');
            var contentBox = this.get("contentBox");
            var boundingBox =  this.get("boundingBox");
            
            if(!contentBox.test('input,textarea')) {
               contentBox = Y.Node.create(MaskedInput.INPUT_TEMPLATE);
               boundingBox.appendChild(contentBox);
            }

            this.inputNode = contentBox;
            
            this.inputNode.set("maxLength",maxlen);
            this.inputNode.set("value",mask);
            this.inputNode.on( "keyup", this._chkValue,this );
            
        },
        
        _chkValue : function(e)  {
            
            var input = Y.Node.getDOMNode(e.currentTarget);
            var caretPos =  this._getCaretPosition(input);
            var ch = this.inputNode.get("value").charAt(caretPos);
            console.log(ch);
            
        },
        
        bindUI: function() {
            
        },

        syncUI: function() {

        },
       
       _getCaretPosition : function(ctrl) {
               var CaretPos = 0;
            // IE Support
            if (document.selection) {
            
                ctrl.focus();
                var Sel = document.selection.createRange();
            
                Sel.moveStart('character', -ctrl.value.length);
            
                CaretPos = Sel.text.length;
            }
            // Firefox support
            else if (ctrl.selectionStart || ctrl.selectionStart == '0') CaretPos = ctrl.selectionStart;
            
            return (CaretPos);
       }

        
        /*Listeners, UI update methods */

    });

    Y.MaskedInput = MaskedInput;

 }, "3.6.0", {requires:["widget","dom","node"]});
// END WRAPPER
