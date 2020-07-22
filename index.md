---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---

# MSc Computer Science - Final project 2018

<div class="clearfix">
  <h2>Abstract</h2>
  The project is quite literally a journey from Hell to Heaven, investigating the computational opportunities of automating text analysis and producing data visualisations.
  From the structure of the writing to the sentiment of Dante Alighieri’s most famous work, the Divine Comedy, this project looks for rules to build components and create an application that offer insights and produces outputs in a format other than text.
</div>

<p>This is baseurl {{ site.baseurl }}</p>

<div class="screenshots clearfix">
  <div class="block">
    <a href="{{ site.baseurl }}/sentiment-pattern/">
      <img src="{{ site.baseurl }}/assets/images/screenshots/viz_screenshot_01.jpg">
    </a>
  </div>
  <div class="block">
    <a href="{{ site.baseurl }}/rhymes/">
      <img src="{{ site.baseurl }}/assets/images/screenshots/viz_screenshot_02.jpg">
    </a>
  </div>
  <div class="block">
    <a href="{{ site.baseurl }}/lines/">
      <img src="{{ site.baseurl }}/assets/images/screenshots/viz_screenshot_03.jpg">
    </a>
  </div>
</div>

<div class="clearfix">
  <h2>How it works (for the time being)</h2>
  <p>All visualisations are generated on the fly with Javascript accessing JSON files that are the product of the server side process.</p>
  <p>The interaction is limited to finding out what the element of the visualisations are.</p> 
</div>

<div class="clearfix">
  <h2>How it will work (plans for the future)</h2>
  <p>Users will be able to select (or even upload) a body of text, fill in the form (see example below) to indicate the text characteristics and hit 'Apply'.</p>
  <p>The form submission will trigger the server side process (now accessible with Jupiter), run the program, receive the output (JSON files) and see them visualised under the 'Visualisations' sections.</p> 
</div>

<div class="clearfix">
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
</div>
