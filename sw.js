self.addEventListener("message", e=>{
  if(e.data.type==="schedule"){
    const t=e.data.task;
    const delay=new Date(`${t.date}T${t.time}`)-Date.now();
    if(delay>0){
      setTimeout(()=>{
        self.registration.showNotification("🔔 תזכורת",{
          body:t.text,
          tag:t.id,
          requireInteraction:true
        });
      }, delay);
    }
  }
});

self.addEventListener("notificationclick", e=>{
  e.notification.close();
  e.waitUntil(clients.openWindow("./"));
});
