
### PickCode ANSI Fix Userscript

Currently, [PickCode](https://pickcode.io/) does not support [ANSI Escape Codes](https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797) due to limitations in how the site renders program output. This userscript is designed to enable the use of colors and styles in the output by interpreting ANSI escape sequences. However, please note that the standard `\x1b` or `\u001b` escape codes are not supported due to parsing restrictions; instead, you must use `^$` as your escape code prefix.

**Supported ANSI Codes:**
The script currently supports the following ANSI codes and corresponding styles:

- `'0'`: Default style (color: initial; background-color: initial; font-weight: normal)
- `'1'`: Bold text (font-weight: bold)
- `'2'`: Dim text (opacity: 0.5)
- `'3'`: Italic text (font-style: italic)
- `'4'`: Underline text (text-decoration: underline)
- `'5'`: Blinking text (text-decoration: blink)
- `'7'`: Inverted colors (filter: invert(100%))
- `'8'`: Hidden text (visibility: hidden)
- `'9'`: Strikethrough text (text-decoration: line-through)
- `'30'` to `'37'`: Text colors (black, red, green, yellow, blue, magenta, cyan, white)
- `'39'`: Reset text color to initial
- `'40'` to `'47'`: Background colors (black, red, green, yellow, blue, magenta, cyan, white)
- `'49'`: Reset background color to initial
- `'90'` to `'97'`: Bright text colors (dark gray to white)
- `'100'` to `'107'`: Bright background colors (dark gray to white)



### Updated Installation Instructions for PickCode ANSI Fix Userscript

To enable ANSI escape code styling on PickCode, you need to install the `fix.user.js` userscript. This script allows you to apply various styles and colors to program output on PickCode.

**Step-by-Step Installation Guide:**

1. **Install a Userscript Manager:**
   - **For Chrome, Edge, or other Chromium-based browsers:** Use [Tampermonkey](https://www.tampermonkey.net/) by clicking "Add to Chrome" or "Add to Edge."
   - **For Firefox:** Use either [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/). Click "Add to Firefox" to install the extension.

2. **Install the Userscript:**
   - Click on the following link to open the raw userscript file: [fix.user.js](https://raw.githubusercontent.com/khanhphxm/Pickcode-Fix/main/fix.user.js).
   - Your userscript manager will detect the script and prompt you to install it. Click **"Install"** or **"Add Script"** to proceed.

3. **Verify Installation:**
   - After installation, click on the userscript manager icon in your browser.
   - Ensure that `PickCode ANSI Color Fixer` is listed and enabled.

4. **Refresh PickCode:**
   - Once the script is installed and active, refresh the PickCode page to apply the changes.

By following these steps, the ANSI escape codes will be recognized in PickCode, allowing you to use the various supported styles and colors in your outputs.

---

**Quick Links:**
- **GitHub Repository:** [Pickcode-Fix](https://github.com/khanhphxm/Pickcode-Fix)
- **Raw Userscript:** [fix.user.js](https://raw.githubusercontent.com/khanhphxm/Pickcode-Fix/main/fix.user.js)

---

**Note:** Ensure you have the latest version of your userscript manager installed to avoid any compatibility issues.

### Screenshots

**Without Fix:**
![Fix OFF](https://media.discordapp.net/attachments/1027348371507257386/1289025657271226419/6A1B4F5A-8F7A-478B-9774-50404EA6D9F9.png?ex=66f75231&is=66f600b1&hm=7ae5a439e3aaba20e69003d5a3c546c9d497e87809951f39ad90959726284346&=&format=webp&quality=lossless)

**With Fix:**
![Fix ON](https://media.discordapp.net/attachments/1027348371507257386/1289025746903367710/6A1D9D08-C766-4393-9D2D-360B3CBFE9F5.png?ex=66f75247&is=66f600c7&hm=5c09844131eabb2ff006bda2538a9b03b4f24241cf2c6359cb61b30aaa490714&=&format=webp&quality=lossless)

