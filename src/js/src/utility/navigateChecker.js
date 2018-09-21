


function navigateChecker()
{
	var docHtml = new XMLSerializer().serializeToString(document);
	if(docHtml.indexOf('<!DOCTYPE html>') === 0)
	{
		// do nothing
	}
	else
	{
		logy(docHtml);

	}
	docHtml = null;
}

