function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
  }

  if(getCookie('login')) {
    Swal.fire(`Welcome ${getCookie('login')}`);
  }


    function truncateString(str, maxLength) {
      str = String(str);
      return str.length > maxLength
      ? str.substring(0, maxLength) + "..."
      : str;
  }

  function createChard(response) {
      return `<a href="${response.link}" class="swiper-slide hide">
          <div class="detail">
              <i class="${response.classname}" aria-hidden="true"></i>
              <span class="title">${response.judul}</span>
              <span class="category">${response.kategori}</span>
              <p>${truncateString(response.deskripsi, 80)}</p>
          </div>
          <img src="/uploads/${response.myimg}" style="width:100%; height: 100%;">
      </a>`;
  }

  const btn = document.querySelectorAll('.btn-kategori');
  const select = document.querySelectorAll('.select-kategori option');
  
  btn.forEach(item => item.addEventListener('click', function() {
      fullcard = '';
      kategori = this.dataset.kategori; 
      fetch(`portfolio/fetch/${kategori}`)
          .then(response => response.json())
          .then(response => {
            
              response.forEach(item => fullcard += createChard(item));
              $('.swiper-wrapper').html(fullcard);

              setTimeout(() => {
                $('.swiper-slide.hide').addClass('show'); 
              }, 10)

              if(window.innerWidth > 1130) {
                
              var swiper = new Swiper(".mySwiper", {
                slidesPerView: 3,
                grid: {
                  rows: 2,
                },
                // Width
                spaceBetween: 25,
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
                },
              });
              } else {
                var swiper = new Swiper(".mySwiper", {
                  slidesPerView: 2,
                  grid: {
                    rows: 2,
                  },
                  // Width
                  spaceBetween: 10,
                  pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                  },
                });
              }
          })
  }))

  const myselect = document.querySelector('.select-kategori'); 
  if(myselect != null) {
    myselect.addEventListener('change', function(e) {
    
      fullcard = '';
      kategori = e.target.value; 
      fetch(`portfolio/fetch/${kategori}`)
          .then(response => response.json())
          .then(response => {
            
              response.forEach(item => fullcard += createChard(item));
              $('.swiper-wrapper').html(fullcard);
  
              setTimeout(() => {
                $('.swiper-slide.hide').addClass('show'); 
              }, 10)
  
              if(window.innerWidth > 1130) {
                
              var swiper = new Swiper(".mySwiper", {
                slidesPerView: 3,
                grid: {
                  rows: 2,
                },
                // Width
                spaceBetween: 25,
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
                },
              });
              } else {
                var swiper = new Swiper(".mySwiper", {
                  slidesPerView: 2,
                  grid: {
                    rows: 2,
                  },
                  // Width
                  spaceBetween: 10,
                  pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                  },
                });
              }
          })
    })
  }
  


$(window).on('scroll', function(e) {
    var position = $(this).scrollTop(); 
    if(window.innerWidth >= 1212) {
      $('#banner-content').css({
        'background-position': `0 ${position/3}px`,
      })
    } 
})




var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  grid: {
    rows: 2,
  },
  // Width
  spaceBetween: 25,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


window.onresize = function() {
  if(window.innerWidth > 1130) {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      grid: {
        rows: 2,
      },
      // Width
      spaceBetween: 25,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  else if(window.innerWidth < 1130) {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 2,
      grid: {
        rows: 2,
      },
      // Width
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  } 
}


window.onload = function() {
  if(window.innerWidth > 1130) {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      grid: {
        rows: 2,
      },
      // Width
      spaceBetween: 25,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  else if(window.innerWidth < 1130) {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 2,
      grid: {
        rows: 2,
      },
      // Width
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  } 
}



const ctx = document.getElementById('myChart');


fetch(`admin/fetch/`)
  .then(response => response.json())
  .then(response => {
    const labels = response.map(item => item._id);
    const data   = response.map(item => item.count); 
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Votes',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });



  });

