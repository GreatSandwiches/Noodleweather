document.addEventListener('DOMContentLoaded', function () {
    var openSettingsBtn = document.getElementById('openSettingsBtn');
    var closeSettingsBtn = document.getElementById('closeSettingsBtn');
    var settingsPopup = document.getElementById('settingsPopup');

    // Show the settings popup
    openSettingsBtn.addEventListener('click', function () {
        settingsPopup.style.display = 'block';
    });

    // Hide the settings popup
    closeSettingsBtn.addEventListener('click', function () {
        settingsPopup.style.display = 'none';
    });

    // Hide the settings popup if the user clicks outside of it
    document.addEventListener('click', function (event) {
        if (event.target !== openSettingsBtn && event.target !== settingsPopup && !settingsPopup.contains(event.target)) {
            settingsPopup.style.display = 'none';
        }
    });
});
