---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---

# How it works

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<form action=".">
  <p>
    <label for="body_of_text">Body of text</label><br>
    <select id="body_of_text">
      <option value="convivio" disabled>Dante Alighieri - Convivio</option>
      <option value="divina_commedia" selected>Dante Alighieri - Divina Commedia</option>
      <option value="decamerone" disabled>Giovanni Boccaccio - Il Decamerone</option>
      <option value="orlando_furioso" disabled>Ludovico Ariosto - Orlando Furioso</option>
    </select>
  </p>

  <p>
    <label for="rima">Select the rhyme structure</label><br>
    <select id="rima">
      <option value="ballade" disabled>Ballade</option>
      <option value="rondeau" disabled>Rondeau</option>
      <option value="terza_rima" selected>Terza rima</option>
      <option value="virelai" disabled>Virelai</option>
    </select>
  </p>

  <p>
    <label for="viz_type">Visualisation type</label><br>
    <select id="viz_type">
      <option value="barchart" selected>Barchart</option>
      <option value="calendar">Calendar</option>
    </select>
  </p>

  <button type="submit">Apply</button>
</form>