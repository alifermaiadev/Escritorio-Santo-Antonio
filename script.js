const menu=document.querySelector('#menu'),
nav=document.querySelector('header nav');

menu.addEventListener('click',()=>{
    nav.classList.toggle('open');
    menu.textContent=nav.classList.contains('open')?'×':'☰'
});

nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const car=document.querySelector('#carousel');

document.querySelectorAll('[data-dir]').forEach(b=>b.addEventListener('click',()=>{
    const card=car.querySelector('article');
    car.scrollBy({
        left:Number(b.dataset.dir)*(card.offsetWidth+16),
        behavior:'smooth'
    })
}));

const reveal=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){
        e.target.classList.add('visible');
        reveal.unobserve(e.target)
    }
}),{
    threshold:.12
});

document.querySelectorAll('.reveal').forEach(e=>reveal.observe(e));

const nums=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    const n=e.target,
    end=+n.dataset.count,
    start=performance.now(),
    suffix=n.dataset.suffix||'';
    function tick(now){
        const p=Math.min((now-start)/1200,1);
        n.textContent=Math.round(end*(1-Math.pow(1-p,3)))+suffix;
        if(p<1)requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick);
    nums.unobserve(n)
}),{
    threshold:.5
});

document.querySelectorAll('[data-count]').forEach(e=>nums.observe(e));

document.querySelector('#contact-form').addEventListener('submit',e=>{
    e.preventDefault();
    const f=e.currentTarget;
    if(!f.reportValidity())return;
    const [nome,email,tel,assunto]=f.querySelectorAll('input');
    const msg=f.querySelector('textarea').value;
    const texto=`Olá! Vim pelo site.\n\n*Nome:* ${nome.value}\n*E-mail:* ${email.value}\n*Telefone:* ${tel.value}\n*Assunto:* ${assunto.value}\n\n*Mensagem:*\n${msg}`;
    window.open('https://wa.me/5519994989722?text='+encodeURIComponent(texto),'_blank');
    document.querySelector('#sent').hidden=false;
    f.reset()
});

 