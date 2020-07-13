const list = document.getElementById('list')

list.addEventListener('click', function () {
  list.classList.contains('clicked') ? list.classList.remove('clicked') : list.classList.add('clicked')
})
