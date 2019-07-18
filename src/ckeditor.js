/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Font from '@ckeditor/ckeditor5-font/src/font';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import imageIcon from '../src/microphone.svg';
import imageIconActive from '../src/microphoneActive.svg';

class Speech extends Plugin {
	init() {
		const editor = this.editor;
		let state = false;
		if ( this.editor.config._config.speechToText ) {
			editor.ui.componentFactory.add( 'speechToText', locale => {
				const view = new ButtonView( locale );
				view.set( {
					label: 'Speech to text',
					icon: imageIcon,
					tooltip: true
				} );
				view.on( 'execute', () => {
					state = !state;
					if ( state ) {
						this.start();
						view.set( {
							label: 'Speech to text',
							icon: imageIconActive,
							tooltip: true
						} );
					} else {
						this.stop();
						view.set( {
							label: 'Speech to text',
							icon: imageIcon,
							tooltip: true
						} );
					}
				} );
				return view;
			} );
		}
	}

	start() {
		this.dispatch( true );
	}

	stop() {
		this.dispatch( false );
	}

	dispatch( value ) {
		const event = new CustomEvent( 'onSpeechToText', {
			detail: value
		} );
		window.dispatchEvent( event );
	}
}

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	Autoformat,
	Bold,
	Italic,
	Heading,
	Link,
	List,
	Paragraph,
	PasteFromOffice,
	Alignment,
	Font,
	Speech
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'alignment',
			'fontSize',
			'undo',
			'redo',
			'speechToText'
		]
	},
	alignment: {
		options: [ 'left', 'center', 'right' ]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
