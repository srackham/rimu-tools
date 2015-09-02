# Rimu Markup Tools

This package contains the following tools for editing and compiling
[Rimu Markup](http://srackham.github.io/rimu/):

- `rimuc`, a command-line app to convert Rimu Makup to HTML.
- `rimu.vim`, a syntax highlighter for the Vim editor.

These tools were previously included in the [Rimu
Markup package](https://github.com/srackham/rimu) (versions 6.x.x and
older).


## Installing Rimu Tools

    sudo npm install -g rimu-tools


## `rimuc` command
_rimuc_ is a Node.js command-line tool that converts Rimu source to
HTML.

See also the [Rimu Markup
reference](http://srackham.github.io/rimu/reference.html).

Run `rimuc --help` to view the `rimuc` manpage:

```
NAME
  rimuc - convert Rimu source to HTML

SYNOPSIS
  rimuc [OPTIONS...] [FILES...]

DESCRIPTION
  Reads Rimu source markup from stdin, converts them to HTML
  then writes the HTML to stdout. If FILES are specified
  the Rimu source is read from FILES. The contents of files
  with an .html extension are passed directly to the output.

  If a file named .rimurc exists in the user's home directory
  then its contents is processed (with safeMode 0) after
  --prepend sources but before any other inputs.
  This behavior can be disabled with the --no-rimurc option.

OPTIONS
  -h, --help
    Display help message.

  -l, --lint
    Check the Rimu source for inconsistencies and errors.

  -o, --output OUTFILE
    Write output to file OUTFILE instead of stdout.

  -p, --prepend SOURCE
    Process the SOURCE text before other inputs.
    Rendered with safeMode 0.

  --no-rimurc
    Do not process .rimurc from the user's home directory.

  -s, --styled
    Include HTML header and footer and Bootstrap CSS styling in
    output. If only one source file is specified and the --output option
    is not used then the output is written to a same-named file with
    an .html extension.

  --safeMode NUMBER
    Specifies how to process inline and block HTML elements.
    --safeMode 0 renders raw HTML (default).
    --safeMode 1 drops raw HTML.
    --safeMode 2 replaces raw HTML with htmlReplacement option text.
    --safeMode 3 renders raw HTML as text.

  --htmlReplacement
    A string that replaces embedded HTML when safeMode is set to 2.
    Defaults to `<mark>replaced HTML</mark>`.

  --title TITLE, --highlightjs, --mathjax, --toc, --section-numbers
    Shortcuts for prepended styling macro definitions:
    --prepend "{--title}='TITLE'"
    --prepend "{--highlightjs}='true'"
    --prepend "{--mathjax}='true'"
    --prepend "{--toc}='true'"
    --prepend "{--section-numbers}='true'"

STYLING MACROS AND CLASSES
  The following macros and CSS classes are available when the
  --styled option is used:

  Macro name         Description
  ______________________________________________________________
  --title            HTML document title (1).
  --highlightjs      Set to non-blank value to enable syntax
                     highlighting with Highlight.js.
  --mathjax          Set to a non-blank value to enable MathJax.
  --toc              Set to a non-blank value to generate a
                     table of contents (1).
  --section-numbers  Apply h2 and h3 section numbering (1).
  ______________________________________________________________
  (1) Must be defined prior to header (--prepend or .rimurc).

  CSS class        Description
  ______________________________________________________________
  verse            Verse format (paragraphs, division blocks).
  sidebar          Sidebar format (paragraphs, division blocks).
  no-print         Do not print.
  dl-numbered      Number labeled list items.
  dl-counter       Prepend dl item counter to element content.
  ol-counter       Prepend ol item counter to element content.
  ul-counter       Prepend ul item counter to element content.
  ______________________________________________________________
```

### Example usage

1. Use _rimuc_ as a filter:

        echo 'Hello *Rimu*!' | rimuc

2. Generate a styled HTML Web page including table of contents
   and code syntax highlighting styling macro shortcut options:

        rimuc --styled --toc --highlightjs README.md

3. Prefix a custom macro definition:

        rimuc --prepend "{annotations}='yes'" showcase.rmu

4. Compile multiple source files to single output file:

        rimuc -o book.html frontmatter.rmu chapter*.rmu backmatter.rmu

### `--styled` option
The `--styled` option prepends a header file and appends footer file
to the other source files. The header and footer ensures:

- The output document is a valid HTML5 document.
- The output document includes
  [Bootstrap](http://getbootstrap.com/2.3.2/) for styling.
- If the `--highlightjs` macro is defined
  [Highlightjs](https://highlightjs.org/) is included.
- If the `--mathjax` macro is defined
  [MathJax](https://www.mathjax.org/) is included.
- If the `--toc` macro is defined a Table of Contents is generated
  from top level `h1`, `h2` and `h3` HTML header elements.
- A slug is synthesized and assigned to the `id` attribute of top
  level `h1`, `h2` and `h3` HTML header elements that do not already
  have an `id`.  For example a header with the title `The End!` is
  assigned an `id` attribute value
  `the-end`. Slug ids are generated from the header title as follows:

  1. Convert the title to lowercase.
  2. Replace spaces with a dash.
  3. Remove characters that are not alphanumeric, dashes or
     underscores. If no characters remain the slug is set to `x`.
  4. If an existing element has a matching id then the slug is
     successively postfixed with `-2`, `-3`... until a unique id is
     found.

- In addition to Bootstrap CSS style classes there are styles for
  verses, sidebars and section numbering (see `rimuc --help` command
  and [Rimu Tips]({tips})).


## Vim syntax file
The Rimu distribution includes a [syntax
highlighte](https://raw.github.com/srackham/rimu-tools/master/tools/vim/syntax/rimu.vim)
for the Vim editor. Copy `rimu.vim` to your `$HOME/.vim/syntax`
directory and then use the Vim `:set syn=rimu` command or put this
line in your `$HOME/.vimrc` file to enable Rimu syntax highlighting:

    autocmd BufRead,BufNewFile *.rmu setlocal filetype=rimu

The syntax file also sets Vim text formatting options, if they're not
to your taste delete them from the end of the file.

