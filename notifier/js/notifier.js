YUI.add("notifier-gf", function(Y) {

   
    /* Notifier class constructor */
    function Notifier(config) {
        Notifier.superclass.constructor.apply(this, arguments);
    }

    Notifier.NAME = "Notifier";

    Notifier.ATTRS = {

         message : {
            value: ""
         },
         
         header : {
        	 value: ""
         },
        
         position: {
        	 value: "bottom-right"
         },
         
         timeout : {
             value : 4000
         },
         
         statusicon : "spinner",
         showBusyoverlay: false
    };
 
    Notifier.MARKUP = '<div class="yui3-notify-close"><a title="close">X</a></div>'+
					  '<div class="yui3-notifier-header  {header_show} ">{header}</div>' +
					  '<div class="yui3-notifier-message">{message}</div>';
    
    /* Notifier extends the base Widget class */
    Y.extend(Notifier, Y.Widget, {
    	
    	BOUNDING_TEMPLATE : '<div/>',
    	
    	
        initializer: function() {
            this.publish("closeEvent", {
                defaultFn: this._defCloseEventFn,
                bubbles:false
            });
        },

        destructor : function() {
            //TODO - destroy this._handle
        },

        renderUI : function() {

            if(this.showBusyoverlay) {
                this._hide_overlay = Y.Node.create("<div></div>");
                Y.one("body").appendChild(this._hide_overlay);
            }
            		
            var nmessage = this.get('message');
            var nheader  = this.get('header');
            var nheader_show;
            if(nheader)   {
            	nheader_show = "notifier-header-show"; 
            }else {
            	nheader_show = "notifier-header-noshow";
            }  
            
            var notifier_content = {
            	message:  nmessage,
                header:   nheader,
                header_show: nheader_show
            };
            
            this.get('contentBox').append(Y.Node.create(Y.substitute(Notifier.MARKUP, notifier_content)));
            this.get('boundingBox').addClass(this.get('position'));
            Y.one('.yui3-notify-close').on('click',function(e) {
                this.fire("closeEvent");
            },this);

        },

        bindUI : function() {
              this.after("messageChange", this._afterMessageChange);
              this.after("headerChange", this._afterHeaderChange);
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
           var onEnd = function() {
                if(this.showBusyoverlay) {
        		   this._hide_overlay.removeClass('hide_overlay');
        		}
          };

    	  anim.on('end', onEnd,this);
		  anim.run();
        },

        syncUI : function() {
             this._uiSetMessage(this.get("message"));
             this._uiSetHeader(this.get("header"));
             this.timer = new Y.Timer({
                 length: this.get("timeout"),
                 repeatCount: 1,
                 callback: Y.bind(this.hide, this)
               });
               this.timer.start();
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
            var content = Y.one('.yui3-notifier-message');
            content.set("innerHTML",val);
        },
        _uiSetHeader : function(val) {
            /* Update the state of attrA in the UI (view) */
        	var header = Y.one('.yui3-notifier-header');
            header.set("innerHTML",val);
        },
        _defCloseEventFn:function(){
        	this.hide();
        }

    });

    Y.namespace("GF").Notifier = Notifier;

 }, "3.2.0", {requires:["widget", "substitute","node","dom","anim","gallery-timer"]});
// END WRAPPER

