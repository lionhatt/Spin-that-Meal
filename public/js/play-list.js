// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Getting references to our form and inputs
  const createForm = $('#create-form');
  const playListName = $('.play-list-name');
  const editBtn = $('.edit');
  const updateForm = $('.update-form');
  const deleteBtn = $('.delete');

  const recipeListPlaylist = $('.recipe-list-playlist');
  const addRecipePlaylistBtn = $('.add-recipe-playlist');
  const allLinkedRecipes = $('.all-linked-recipes');
  const removeRecipePlaylist = $('.remove-recipe-playlist');
  let userId;

  load();

  /**
* Loads existing chat messages.
*/
  function load() {
    // Send the POST request.
    $.get('/api/member', {
    }).then(
        (result) => {
          userId = result.id;
        },
    );

    $.get('/api/recipes-in-list', {
    }).then(
        (result) => {
          $.each(result.Recipe, function(index, item) {
            recipeListPlaylist.append(
                `<option value="${item.id}">${item.name}</option>`);
          });
        },
    );
    $.get('/api/recipe-playlist', {
    }).then(
        (result) => {
          $.each(result.PlayList, function(index, item) {
            console.log(item);
            allLinkedRecipes.append(
                `<li data-id="${item.Recipe.id}">${item.Recipe.name}</li>` +
                `<button class="uk-button btn-flex-size remove-recipe-playlist" recipeid="${item.Recipe.id}" playlistid="${item.PlayList.id}">Remove</button>`,
            );
          });
        },
    );
    // allLinkedRecipes.append(
    //   `<option value="${item.id}">${item.name}</option>`);
  }


  // ADD new category
  createForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    const newPlayList = {
      name: playListName.val().trim(),
      UserId: userId,
    };
    // Send the POST request.
    $.ajax('/api/play-lists', {
      type: 'POST',
      data: newPlayList,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });

  // EDIT Playlist
  editBtn.on('click', function(event) {
    const id = $(this).data('id');
    location.assign(`/api/play-lists/${id}`);
  });

  updateForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    const id = $(this).data('id');
    const updatedPlayLists = {
      id: id,
      name: playListName.val().trim(),
      UserId: userId,
    };
    // Send the PUT request.
    $.ajax(`/api/play-lists`, {
      type: 'PUT',
      data: updatedPlayLists,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.assign('/api/play-lists');
        },
    );
  });

  // DELETE Playlist
  deleteBtn.on('click', function(event) {
    const id = $(this).data('id');
    // Send the DELETE request.
    $.ajax(`/api/play-lists/${id}`, {
      type: 'DELETE',
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });

  addRecipePlaylistBtn.on('click', function(event) {
    event.preventDefault();
    const playlistId = updateForm.data('id');
    const recipeId = recipeListPlaylist.val();
    const newRecipePlayList = {
      PlayListId: playlistId,
      RecipeId: recipeId,
    };
    console.log(newRecipePlayList);
    // Send the POST request.
    $.ajax('/api/recipe-playlist', {
      type: 'POST',
      data: newRecipePlayList,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });

  $(document).on('click', removeRecipePlaylist, function(event) {
    event.preventDefault();
    console.log(event.target.attributes)
    const recipeid = parseInt(event.target.attributes.recipeid.value);
    const playlistid = parseInt(event.target.attributes.playlistid.value);
    
    // Send the DELETE request.
    $.ajax(`/api/recipe-playlist/${playlistid}/${recipeid}`, {
      type: 'DELETE',
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });
});
