crtg_content = '';

    (function()
    {
        var bodies = document.getElementsByTagName('body');
        var img = document.createElement('img');
        img.width = 0;
        img.height = 0;
        img.style.display = 'none';
        img.async = true;
        img.src = 'http://px.ph.affinity.com/pd.php?ty=cr&rr=23667859707&value=';
        if (bodies.length > 0)
            bodies[0].appendChild(img);
    })();
