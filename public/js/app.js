const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mesg1 = document.querySelector('#mesg1')
const mesg2 = document.querySelector('#mesg2')

mesg1.textContent = ''
mesg2.textContent = ''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    mesg1.textContent = 'Loading...'
    mesg2.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            mesg1.textContent= data.error
        }else{
            mesg1.textContent = data.location
            mesg2.textContent = data.forecast
        }
    })
    })
})