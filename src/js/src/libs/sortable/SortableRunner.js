

function runSortable()
{
	var el         = $('.sortable');
	var mySortable = null;
	// console.log(el);

	if(el.length > 0)
	{
		el = el[0];
		mySortable = Sortable.create(el,
		{
			handle: '.handle',
			animation: 300,
			filter: ".fix",
			chosenClass: 'isChoosen',
			onUpdate: function (e)
			{
				var item = e.item;
				if(typeof rearrangeSortable === 'function')
				{
					rearrangeSortable();
				}
			}
		});
	}
}

