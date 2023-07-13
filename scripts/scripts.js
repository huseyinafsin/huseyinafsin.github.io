
// function toggleTheme() {
// }

// $(function(){
//     $("#btnTheme").on("click", function () {
//         $("body").addClass("dark-mode")

//     })
// })

GitHubCalendar(".calendar", "huseyinafsin");

// or enable responsive functionality:
GitHubCalendar(".calendar", "huseyinafsin", { responsive: true });

// Use a proxy
GitHubCalendar(".calendar", "huseyinafsin", {
   proxy (username) {
     return fetch(`https://your-proxy.com/github?user=${username}`)
   }
}).then(r => r.text())


$('.card-tech').slick({
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll per click
    autoplay: true, // Set to true to enable autoplay
    autoplaySpeed: 2000, // Autoplay speed in milliseconds
    dots: true, // Set to true to display navigation dots
    arrows: false, // Set to true to display navigation arrows
    responsive: [
      {
        breakpoint: 768, // Adjust breakpoint as needed
        settings: {
          slidesToShow: 2 // Adjust the number of slides to show at this breakpoint
        }
      }
    ]
  });