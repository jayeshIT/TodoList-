exports.definition = {
	config : {
		columns : {
			"id" : "INTEGER PRIMARY KEY AUTOINCREMENT",
			"content" : "TEXT",
			"date" : "TEXT",
			"dateobject" : "TEXT",
			"status" : "TEXT",
			"image" : "TEXT"
		},
		adapter : {
			type : "sql",
			collection_name : "toDoList",
			idAttribute : "id"
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			comparator : function(model) {
				Ti.API.info('----model.get():' + model.get('dateobject'));
				if (model.get('dateobject') != undefined) {
					var date_new = null;
					if (!(model.get('dateobject') instanceof Date )) {
						if ( typeof model.get('dateobject') === "number") {
							var date = new Date(model.get('dateobject'));
						} else if ( typeof model.get('dateobject') === "string") {
							if (isNaN(parseInt(model.get('dateobject')))) {
								var date = new Date(model.get('dateobject'));
							} else {
								var date = new Date(parseInt(model.get('dateobject')));
							}
						}
					}
					var date_new = date;
					Ti.API.info('--comparator date :' + date_new);
					return -date_new.getTime();
				}

			}
		});
		return Collection;
	}
};
