
var oneConfig = function($routeProvider) 
{
  $routeProvider
    .when('/',
    {
      controller: 'ChaptersController',
      templateUrl: 'view/chapters.html'
    });
};
var todomvc = angular.module('todomvc', []).config(oneConfig);


***************************************************

Guidebook.controller('ChaptersController',
  function ($scope, $location, $routeParams, ChapterModel, NoteModel)
 {
    var chapters = ChapterModel.getChapters();
    for (var i=0; i<chapters.length; i++)
    {
    	chapters[i].notes = NoteModel.getNotesForChapter(chapters[i].id);
    }
    $scope.chapters = chapters;
    $scope.selectedChapterId = $routeParams.chapterId;
    $scope.onDelete = function(noteId)
    {
    var confirmDelete = confirm('Are you sure you want to delete this note?');
      if (confirmDelete)
      {
        $location.path('/deleteNote/' + $routeParams.chapterId + '/' + noteId);
      }
    };
  }
);



***************************************************

Guidebook.service('ChapterModel', function()
{
  this.getChapters = function()
 {
    return [
    {
      id: 0,
      title: 'Chapter 1: So, What is AngularJS?',
      summary: 'Find out what separates AngularJS from...'
    },
    {
      id: 1,
      title: 'Chapter 2: HelloWorld',
      summary: 'Learn how to get up and running with...'
    },
    {
      id: 2,
      title: 'Chapter 3: QuickStart',
      summary: 'Brush up on the Model-View-Controller...'
    },
    {
      id: 3,
      title: 'Chapter 4: Key AngularJS Features',
      summary: 'Discover the strengths of AngularJS...'
    }, 
    {
      id: 4,
      title: 'Chapter 5: The AngularJS Community',
      summary: 'Get to know the top contributors...'
    }
     ]
 };
});


***************************************************

Guidebook.service('NoteModel', function()
{
  this.getNotesForChapter = function(chapterId)
  {
    var chapter = JSON.parse(window.localStorage.getItem(chapterId));
    if (!chapter)
    {
      return [];
    }
    return chapter.notes;
  };

  this.addNote = function(chapterId, noteContent)
  {
     var now = new Date();
     var note =
     {
       content: noteContent,
       id: now
     };

     var chapter = JSON.parse(window.localStorage.getItem(chapterId));
     if (!chapter) 
      {
        chapter =
        {
         id: chapterId,
         notes: []
        }
      }
    chapter.notes.push(note);
    window.localStorage.setItem(chapterId, JSON.stringify(chapter));
  };


  this.deleteNote = function(chapterId, noteId)
  {
    var chapter = JSON.parse(window.localStorage.getItem(chapterId));
    if (!chapter || !chapter.notes)
    {
      return;
    }
    for (var i=0; i<chapter.notes.length; i++)
    {
      if (chapter.notes[i].id === noteId)
      {
        chapter.notes.splice(i, 1);
        window.localStorage.setItem(chapterId, JSON.stringify(chapter));
        return;
      }
    }
  };

});


********************************************************