# Quick explanation

To help with basic tasks I have created some helpers which are pretty much functions. These functions can include things like
checking the user is an admin. To call one use handlebars syntax like this:

```
{{#if (isUserAdmin)}}
<p>This will only display if the current user has the role admin</p>
{{/if}}
```

This was a very quick and basic helpers tutorial but there are many more helpers that I will write about and give better 
tutorials for. If you want to see a quick demo look at `dashboard.hbs` in `views/layouts`.