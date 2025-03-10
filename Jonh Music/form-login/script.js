// alternar tema 
const toggleSwitch = document.getElementById('modeToggle');
const checkbox = document.getElementById('checkbox');
const body = document.body;
function horaTema() {
    const hour = new Date().getHours();
    if(hour >= 18 || hour < 6){
        body.classList.remove('claro')
        checkbox.checked = true;
    }
    else{
        body.classList.add('claro')
        checkbox.checked = false;
    }
}

toggleSwitch.addEventListener('change', () => {
    body.classList.toggle('claro');
});

horaTema();
// alternar tema 