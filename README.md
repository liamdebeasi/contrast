<p align="center">
   <img src="./public/contrast-logo.svg" width="125" />
   <h1 align="center">
      Contrast
   </h1>
</p>

<p align="center">
   Ensure colors pass WCAG color contrast guidelines 
   
   Contrast allows you to quickly know if foreground and background colors pass accessibility guidelines defined by the W3C. It reports if the colors chosen pass normal text, large text, and UI component requirements as well as what level they pass (A, AA, or AAA). 
</p>

<p align="center">
   <img src="./assets/contrast.png" width="450" />
</p>

## Usage

Contrast is available on the web: http://liamdebeasi.github.io/contrast/

I recommend [installing Contrast as a Progressive Web App (PWA)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing#installing_pwas) for easier access. This will allow you to add a shortcut to your home screen or dock and run Contrast as a standalone application.

Contrast will automatically update when bug fixes and new features are available and can also be used offline.

### Modes

Contrast starts in "Basic Mode" by default. This shows the color contrast ratio and a rating of "Fail", "Pass", or "Great" based on the color contrast value. "Developer Mode" can be enabled by clicking the hammer icon and provides results based on each content type: Small text, large text, and UI components.

"Basic Mode" is ideal for those who quickly need to understand if their colors have sufficient contrast, while "Developer Mode" is ideal for those who need their contrast results tailored to specific content types.

### Selecting Colors

**Eye Dropper**

The eyedropper tool can be used to select a specific color anywhere on your screen, even if the color is displayed outside of Contrast. [^1]

**Text Input**

The selected foreground and background colors are displayed in their respective inputs. However, these inputs can be edited to any valid hex color.

**Color Palette**

The color palette tool can be used to bring up the browser's native color picker for more advanced color selection.

### Modifying Colors

Contrast can help suggest more accessible colors using the "Auto Adjust" tool. Clicking the wand icon will adjust the background color if necessary to bring the color contrast ratio up to at least 4.5:1 (AA).

### Copying Colors

The clipboard icon can be used to copy the foreground or background color to your clipboard for usage outside of the app.

### Viewing Results

The color contrast ratio will be displayed at the top of the screen. The color contrast levels for each type of web content test will be displayed below that. The table below lists the possible results for each content type:

| Content Type | Possible Values |
| - | - |
| Small Text | A/Fail, AA, AAA |
| Large Text | A/Fail, AA, AAA |
| UI Components | A/Fail, AA |

## Browser Support

| Browser | Version |
| - | - |
| Safari | 16+ [^1] |
| Chrome/Edge | 100+ [^2] |
| Firefox | 100+ [^1] |

Contrast likely works on older versions of these browsers. However, I work on this project in my free time, so I intentionally kept the browser support scope narrow.

## Local Development

### Install dependencies

```shell
pnpm install
```

### Run dev server

```shell
pnpm run dev
```

### Testing Changes

Contrast uses [Playwright](https://playwright.dev) and [Axe](https://github.com/dequelabs/axe-core) for testing.

```shell
# Installs the latest browsers if needed. 
# You only need to do this on first setup and
# whenever the Playwright dependency is updated.
pnpm playwright install

# Run tests
pnpm run test
```

## Contributing

I will fix bugs, add new features, and respond to questions as time allows. If you see a bug, please feel free to submit a pull request!

## Acknowledgments

Contrast was inspired by https://contrasteapp.com. Thanks for making such a great app!

[^1]: As of November 2023, Safari and Firefox do not support the [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper), so the eye dropper feature is not available in those browsers. However, using the color palette picker lets you access an eye dropper tool once the color palette picker menu appears.

[^2]: As of November 2023, there is a known bug in Blink (the engine that powers Chrome and Edge) that causes the color palette picker to not appear when Contrast is installed on macOS. This issue should be resolved with the upcoming Chrome v121 release. See https://bugs.chromium.org/p/chromium/issues/detail?id=1488347 for more information.
