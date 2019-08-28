$(document).ready(() => {
  // alert("ddddd");
  console.log("flow 1");

  let page = 0;
  let term = '';
  $(`.${testTarget.testSelect2Target}`)
  .select2({
    placeholder:"this is placeholder",
    width: '50%',

    ajax: {
      url: "https://yts.lt/api/v2/list_movies.json",
      dataType: 'json',
      delay: 1000,
      data: params => {
        // ajax data
        
        const _page = 
        params.page ? 
          params.page !== page ? params.page
          : page + 1
        : page + 1;
        page = _page;
        
        const _params = {}
        if (_page) {
          // page
          _params.page = _page;
        }
        if (params.term) {
          // searching string
          _params.query_term = params.term;
        }

        return _params;
      },
      processResults: function(data) {
        console.log(data);

        let options = [];
        if (data.data.movie_count > 0) {

          // modifying data
          options = 
          data.data.movies.map(movie => {
            return {
              id: movie.id,
              text: movie.title
            };
          });
        }

        return {
          results: options,
          pagination: { 
            more: data.data.movie_count > 0 // -> offsetだろうがナンだろうが必要
          }
        };
      }
    },




    // templateResult: option => {
    //   console.log(option)
    //   return option;
    // },
    // matcher: (params, data) => {
    //   console.log(params);
    //   console.log(params);
    //   debugger;
    // }

  });













  // from https://select2.org/data-sources/ajax
  $(".js-example-data-ajax").select2({
    width: '50%',
    ajax: {
      url: "https://api.github.com/search/repositories",
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          q: params.term, // search term
          page: params.page
        };
      },
      processResults: function (data, params) {
        // parse the results into the format expected by Select2
        // since we are using custom formatting functions we do not need to
        // alter the remote JSON data, except to indicate that infinite
        // scrolling can be used
        params.page = params.page || 1;
  
        return {
          results: data.items,
          pagination: {
            more: (params.page * 30) < data.total_count
          }
        };
      },
      cache: true
    },
    placeholder: 'Search for a repository',
    minimumInputLength: 1,
    templateResult: formatRepo,
    templateSelection: formatRepoSelection
  });
  
  function formatRepo (repo) {
    if (repo.loading) {
      return repo.text;
    }
  
    var $container = $(
      "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__avatar'><img src='" + repo.owner.avatar_url + "' /></div>" +
        "<div class='select2-result-repository__meta'>" +
          "<div class='select2-result-repository__title'></div>" +
          "<div class='select2-result-repository__description'></div>" +
          "<div class='select2-result-repository__statistics'>" +
            "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> </div>" +
            "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> </div>" +
            "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> </div>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  
    $container.find(".select2-result-repository__title").text(repo.full_name);
    $container.find(".select2-result-repository__description").text(repo.description);
    $container.find(".select2-result-repository__forks").append(repo.forks_count + " Forks");
    $container.find(".select2-result-repository__stargazers").append(repo.stargazers_count + " Stars");
    $container.find(".select2-result-repository__watchers").append(repo.watchers_count + " Watchers");
  
    return $container;
  }
  
  function formatRepoSelection (repo) {
    return repo.full_name || repo.text;
  }






})


$("#testBtn").on("click", e => {
  console.log("fffff");
});

const testFunc = () => {
  console.log("fffffffffffff");
}
$(document).on("click", "#testBtn", testFunc)

const bindEvent = e => {
  $(`.${testTarget.testSelect2Target}`)
  .on('select2:select', e => {
    
    debugger
    console.log(e);
    console.log('bind select2:select');

  })
  .on('select2:open', e => {
    
    debugger
    console.log(e);
    console.log('bind select2:open');

  })
  .on('select2:unselect', e => {
    
    debugger
    console.log(e);
    console.log('bind select2:unselect');

  })
  .on('select2:clear', e => {
    
    debugger
    console.log(e);
    console.log('bind select2:clear');

  })

}

const unbindEvent = e => {
  $(`.${testTarget.testSelect2Target}`)
  .off('change')
  .off('select2.change')
  .off('select2:select')
  .off('select2:unselect')
  .off('select2:open')
  .off('select2:close')
  .off('select2:claer');
}



// events
$(document).on("click", ".event__btns .bindEvent", bindEvent)
$(document).on("click", ".event__btns .unbindEvent", unbindEvent)

