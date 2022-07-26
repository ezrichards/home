setInterval(function() {
    let now = new Date();      
    let hour = now.getHours();
    let minutes = now.getMinutes();
    if(hour > 12) {
        hour = hour - 12;
    }

    const NOTIFICATION_TITLE = '20/20/20, ' + hour + ":" + minutes;
    const NOTIFICATION_BODY = 'Rest your eyes. Look away 20 feet for 20 seconds.';
    
    new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY, silent: true });
}, 1200000);
