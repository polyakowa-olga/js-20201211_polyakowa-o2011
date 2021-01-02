export default class NotificationMessage {
  static rememberMessage;
    constructor(
                message = '' ,
                {
                 duration = 1000,
                 type = ''
                } = {}) {

     if(NotificationMessage.rememberMessage) {
      NotificationMessage.rememberMessage.remove();
     }
     this.message = message;
     this.duration = duration; 
     this.type = type;            
     this.durationInSeconds = (duration/1000 + 's');
     this.render();
    }

  
 
   
 get template() {
  return `
   <div id = "wr" class="notification ${this.type}" style="--value:${this.durationInSeconds}">
     <div class="timer"></div>
     <div class="inner-wrapper">
       <div  class="notification-header">Notification</div>
       <div  class="notification-body">
        ${this.message}
       </div>
     </div>
   </div>
   `;
  }
  
  
  render() {

    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    
    NotificationMessage.rememberMessage = this.element; 
    
  }
  
  show (parent = document.body) {                                            
    parent.append(this.element);    
     
    setTimeout(() => this.destroy(), this.duration);                                           
       
   }  

  remove () {
   this.element.remove() ;
  }

  destroy() {
    this.remove();
    NotificationMessage.rememberMessage = null;
  }



}
