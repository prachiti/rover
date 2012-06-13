YUI.add("statusbar", function(Y) {

   
    /* Notifier class constructor */
    function Statusbar(config) {
        Statusbar.superclass.constructor.apply(this, arguments);
    }

    Statusbar.NAME = "Statusbar";

    Statusbar.ATTRS = {

         content : {
            value: ""
         },
         position: {
        	 value: "bottom"
         },
         
         timeout : {
             value : undefined
         }
    };
 
    Statusbar.MARKUP =  '<div class="yui3-gallery-statusbar-close"><a title="close">X</a></div>' +
					    '<div class="yui3-gallery-statusbar-message ">{message}</div>';
                        
    
    /* Notifier extends the base Widget class */
    Y.extend(Statusbar, Y.Widget, {
    	
    	BOUNDING_TEMPLATE : '<div/>',
    	
    	
        initializer: function() {
            this.publish("closeEvent", {
                defaultFn: this._defCloseEventFn,
                bubbles:false
            });
        },

        destructor : function() {
            
        },

        renderUI : function() {
    
            var message = this.get('message');
                            
            this.get('contentBox').append(Y.Node.create(Y.substitute(Statusbar.MARKUP, message)));
            this.get('boundingBox').addClass(this.get('position'));
            
            Y.one('.yui3-gallery-statusbar-close').on('click',function(e) {
                this.fire("closeEvent");
            },this);

        },

        bindUI : function() {
              this.after("messageChange", this._afterMessageChange);
              this._onHover();
        },
	    
		hide : function(oArgs) {
		
			if(this.timer) {
			      this.timer.stop();
			      this.timer = null;
			    }

		    var anim = new Y.Anim({
                node: this.get('boundingBox'),
                to: {
                    opacity: 0
                },
				easing:'easeIn',
                duration:0.5
           });
          anim.run();
        },

        syncUI : function() {
             this._uiSetMessage(this.get("message"));
             if(this.timer !== undefined) {
                 this.timer = new Y.Timer({
                     length: this.get("timeout"),
                     repeatCount: 1,
                     callback: Y.bind(this.hide, this)
                   });
                   this.timer.start();
              }
        },
        
        _onHover : function() {
            
        	var cb = this.get("contentBox");
        	cb.on('mouseenter',Y.bind(function(e) {
              if(this.timer) {
            	  this.timer.pause();
              }
        	},this));

        	cb.on('mouseleave',Y.bind(function(e) {
              if(this.timer) {
                this.timer.resume();
              }
            },this));
          },
        	
         /*Listeners, UI update methods */
        _afterMessageChange : function(e) {
            /* Listens for changes in state, and asks for a UI update (controller). */
             this._uiSetMessage(e.newVal);
        },

        _afterHeaderChange : function(e) {
            /* Listens for changes in state, and asks for a UI update (controller). */
        	if(e || e.newVal) {
        		this._uiSetHeader(e.newVal);
        	}
             
        },
        _uiSetMessage : function(val) {
            /* Update the state of attrA in the UI (view) */
            var message = Y.one('.yui3-gallery-statusbar-message');
            message.set("innerHTML",val);
        },
       
        _defCloseEventFn:function(){
        	this.hide();
        }

    });

    Y.Statusbar = Statusbar;

 }, "3.5.0", {requires:["widget", "substitute","node","dom","anim","gallery-timer"]});
// END WRAPPER

