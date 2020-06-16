*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Test Setup        Run Keywords
...               Go To              ${STORYBOOK_URL}/iframe.html?id=components-file-uploader--automation-sample
...               AND                Wait Until Element Is Enabled    ${button_removeFile}
Suite Teardown    Close Browser
Force Tags        smoke


*** Variables ***
${dropZone-inputArea}    css:input[type=file]
${button_removeFile}     css:button[aria-label='Remove File']

*** Test Cases ***
remove files one by one
    Click Element                       ${button_removeFile}
    Wait Until Page Does Not Contain    file 1.png              2s
    Page Should Contain Element         ${button_removeFile}    limit=3
    Click Element                       ${button_removeFile}
    Click Element                       ${button_removeFile}
    Click Element                       ${button_removeFile}
    Page Should Not Contain Element     ${button_removeFile}

dropZone is clickable
    Choose File    ${dropZone-inputArea}    ${SUITE_SOURCE}

label when file exceeds the maximum size
    [Setup]    NONE
    Page Should Contain    The file exceeds the maximum upload size

label when file type not allowed
    [Setup]    NONE
    Page Should Contain    File type not allowed for upload