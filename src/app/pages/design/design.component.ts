import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import html2canvas from 'html2canvas';
import { ClipboardService } from 'ngx-clipboard';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Observable } from 'rxjs';


/* string variables */
const INIT_WIDTH_PREVIEW: number = 282;
const INIT_HEIGHT_PREVIEW: number = 376;
const ANGLE_DEFAULT: string = '180';
const IMG_OPTION_COVER: string =
  'Stretch image while maintaining aspect ratio';
const TEXTAREA_PLACEHOLDER: string = 'Enter banner text';
const INPUT_LINK_PLACEHOLDER: string = 'Enter link';
const LINE_HEIGHT_DEFAULT: number = 1.15;
const MAX_NUM_LINE_OF_TEXT: number = 3;

/* data arrays */
const backgroundPositions: string[][] = [
  ['Centre', 'center center'],
  ['Centrer en haut', 'center top'],
  ['Centrer en bas', 'center bottom'],
  ['En haut à gauche', 'left top'],
  ['Centre gauche', 'left center'],
  ['En bas à gauche', 'left bottom'],
  ['En haut à droite', 'right top'],
  ['Centre droit', 'right center'],
  ['En bas à droite', 'right bottom'],
];

const backgroundSizes: string[][] = [
  ['Étirement vertical avec les proportions', 'auto 100%'],
  ['Étirement horizantal avec les proportions', '100% auto'],
  ['Stretch to fit canvas', '100% 100%'],
  ['Étirement avec les proportions', 'cover'],
  ['Contenir les proportions', 'contain'],
];

const textConfigurationList = [
  {
    default: 'police par défaut',
    control: 'fontFamily',
    selectValue: ['Roboto', 'Arial', 'Times New Roman'],
    styleValue: ['Roboto', 'Arial', 'Times New Roman'],
  },
  {
    default: 'font size',
    control: 'fontSize',
    selectValue: ['Default', '14', '18', '22', '26', '32', '38'],
    styleValue: ['16', '14', '18', '22', '26', '32', '38'],
  },
  {
    default: 'Font Weight',
    control: 'fontWeight',
    selectValue: ['Normal', 'Bold'],
    styleValue: ['normal', 'bold'],
  },
];

const textLayoutArr = [
  {
    value: 'left',
    displayValue: 'On the left side',
    icon: 'format_align_left',
  },
  {
    value: 'center',
    displayValue: 'Centered',
    icon: 'format_align_center',
  },
  {
    value: 'right',
    displayValue: 'On the right side',
    icon: 'format_align_right',
  },
];

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})

export class DesignComponent implements OnInit {
  /* variables */
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  imageDefaultOption = null;
  imageOptionCover = IMG_OPTION_COVER;
  bgPosOptions: string[][] = backgroundPositions;
  bgSizeOptions: string[][] = backgroundSizes;
  defaultColor: string = '#ffffff';
  defaultGradientColor: string = '#ffffff';
  defaultTextColor: string = '#353535';
  gradientColorOptionString: string = '';
  angleGradient: string = ANGLE_DEFAULT;
  textAreaPlaceholder: string = TEXTAREA_PLACEHOLDER;
  inputLinkPlaceholder: string = INPUT_LINK_PLACEHOLDER;
  lineHeightDefault: number = LINE_HEIGHT_DEFAULT;
  maxLinesOfText: number = MAX_NUM_LINE_OF_TEXT;
  textConfigList = textConfigurationList;
  patternUrl: RegExp = /^[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
  topPosition: number = 0;
  mouseAction: boolean = false;
  intervalId: ReturnType<typeof setInterval> | undefined;
  textLayout = textLayoutArr;
  screenCopy: any;

  intervalInc() {
    if (this.intervalId) {
      this.intervalId = setInterval(() => {
        console.log('Interval function called');
        // Increment or update any variables here
      }, 1000);
    }
  }

  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  /* form group */
  parameterForm = this.fb.group({
    width: [INIT_WIDTH_PREVIEW],
    height: [INIT_HEIGHT_PREVIEW],
    bgImage: [''] || [null] || [undefined],
    fileAttr: ['Choisissez une image pour le fond'],
    bgColorFrom: [null],
    bgColorTo: [null],
    colorDirection: [this.angleGradient],
    imgPosition: [this.bgPosOptions[0][1]],
    imgCover: [this.bgSizeOptions[0][1]],
    bgGradient: [false],
    text: [null, Validators.required],
    link: ['', Validators.required],
    textAlign: [this.textConfigList[0].styleValue[0]],
    fontFamily: [this.textConfigList[0].styleValue[0]],
    fontSize: [this.textConfigList[1].styleValue[0]],
    fontWeight: [this.textConfigList[2].styleValue[0]],
    widthText: [INIT_WIDTH_PREVIEW],
    textColor: [null],
  });

  dynamicStyle$: Observable<{ width: string; height: string; backgroundColor: string; background: string; position: string; }>;

  maxHeight: number =
    (Number(this.parameterForm.get('fontSize')!.value) || 0) *
    this.lineHeightDefault *
    this.maxLinesOfText;


  @ViewChild('screen') screen: ElementRef;
  @ViewChild('content') content: ElementRef;
  @ViewChild('pre') pre: ElementRef;

  dynamicPreviewStyle = {
    width: '',
    height: '',
    backgroundColor: '',
    background: '',
    position: 'relative',
  };

  dynamicPreStyle = {
    display: 'block',
    position: 'absolute',
    width: '',
    lineHeight: this.lineHeightDefault,
    maxHeight: `${this.maxHeight}px`,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflow: 'hidden',
    textAlign: '',
    fontFamily: '',
    fontSize: '',
    fontWeight: '',
    color: this.defaultTextColor,
    top: `${this.topPosition}px`,
  };

  dynamicBgImage = {
    width: '100%',
    height: '100%',
    zIndex: 99,
    backgroundImage: '',
    backgroundPosition: '',
    backgroundSize: '',
    backgroundRepeat: 'no-repeat',
  };

  constructor(
    private fb: FormBuilder,
    private clipboardService: ClipboardService
  ) { }

  ngOnInit(): void {
    this.intervalInc();


    this.dynamicStyle$ = this.parameterForm.valueChanges.pipe(
      startWith(this.parameterForm.value),
      map((val) => {
        this.dynamicPreviewStyle.width = `${val.width}px`;
        this.dynamicPreviewStyle.height = `${val.height}px`;
        if (val.bgColorFrom !== undefined && val.bgColorFrom !== null) {
          this.dynamicPreviewStyle.backgroundColor = val.bgColorFrom;
        }

        if (val) {
          this.dynamicPreviewStyle.background = val.bgGradient
            ? val.bgColorFrom || ''
            : `linear-gradient(${val.colorDirection}deg, ${val.bgColorFrom || ''}, ${val.bgColorTo || ''})`;
          this.dynamicBgImage.backgroundImage = val.bgImage
            ? 'none'
            : `url(${val.bgImage || ''})`;
        }


        if (val.imgPosition !== undefined && val.imgPosition !== null) {
          this.dynamicBgImage.backgroundPosition = val.imgPosition;
        }
        if (val.imgCover !== undefined && val.imgCover !== null) {
          this.dynamicBgImage.backgroundSize = val.imgCover;
        }
        this.dynamicPreStyle.width = `${val.widthText}px`;
        if (val.textAlign !== undefined && val.textAlign !== null) {
          this.dynamicPreStyle.textAlign = val.textAlign;
        }
        if (val.fontFamily !== undefined && val.fontFamily !== null) {
          this.dynamicPreStyle.fontFamily = val.fontFamily;
        }
        this.dynamicPreStyle.fontSize = `${val.fontSize}px`;
        if (val.fontWeight !== undefined && val.fontWeight !== null) {
          this.dynamicPreStyle.fontWeight = val.fontWeight;
        }
        if (val.textColor !== undefined && val.textColor !== null) {
          this.dynamicPreStyle.color = val.textColor;
        }
        return this.dynamicPreviewStyle;
      })
    );
  }

  onChangeFirstColor(color: any) {
    this.parameterForm.patchValue({ bgColorFrom: color });
  }

  onChangeSecondColor(color: any) {
    this.parameterForm.patchValue({ bgColorTo: color });
  }

  onChangeTextColor(color: any) {
    this.parameterForm.patchValue({ textColor: color });
  }

  textLayoutChange(event: MatButtonToggleChange) {
    this.dynamicPreStyle.textAlign = event.value;
  }

  previewFile(fileInput: any): void {
    this.imageError;
    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 20971520;
      const max_height = 500;
      const max_width = 500;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Taille maximum ' + max_size / 1000 + 'Mb';
        return; // return early if file size is too large
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const target = rs.currentTarget as HTMLImageElement;
          if (target && target.height && target.width) {
            const img_height = target.height;
            const img_width = target.width;

            if (img_height > max_height && img_width > max_width) {
              this.imageError =
                'Dimensions maximales possibles ' +
                max_height +
                '*' +
                max_width +
                'px';
            } else {
              const imgBase64Path = e.target.result;
              this.cardImageBase64 = imgBase64Path;
              this.isImageSaved = true;

              if (this.cardImageBase64) {
                this.parameterForm.patchValue({ bgImage: this.cardImageBase64 });
              } else {
                this.parameterForm.patchValue({ bgImage: null });
              }
            }
          }
        };
        reader.readAsDataURL(fileInput.target.files[0]);
      };
    }
  }

  formatLabel(value: number) {
    if (value >= 1) {
      return value + 'd';
    }
    return value;
  }

  formatLabelWidth(value: number = INIT_WIDTH_PREVIEW) {
    return value + 'px';
  }

  /* positioning the text on the banner */

  getErrorMessageLink() {
    return this.parameterForm.hasError('required', 'link')
      ? 'Champ de saisie obligatoire'
      : '';
  }

  increaseStart($event: any) {
    const maxTopPosition: number = this.parameterForm.get('height')!.value || 0;
    this.mouseAction = true;
    $event.type === 'mousedown' &&
      this.mouseAction &&
      ((this.intervalId = setInterval(() => {
        if (this.topPosition < maxTopPosition - this.maxHeight) {
          this.topPosition++;
          this.dynamicPreStyle.top = this.topPosition + 'px';
        }
      })),
        500);
  }

  increaseStop($event: any) {
    ($event.type === 'mouseleave' || $event.type === 'mouseup') &&
      this.mouseAction &&
      this.stopInterval();
    this.mouseAction = false;
  }

  decreaseStart($event: any) {
    this.mouseAction = true;
    $event.type === 'mousedown' &&
      this.mouseAction &&
      ((this.intervalId = setInterval(() => {
        if (this.topPosition > 0) {
          this.topPosition--;
          this.dynamicPreStyle.top = this.topPosition + 'px';
        }
      })),
        500);
  }

  decreaseStop($event: any) {
    ($event.type === 'mouseleave' || $event.type === 'mouseup') &&
      this.mouseAction &&
      this.stopInterval();
    this.mouseAction = false;
  }

  /* download to PNG */
  downloadImage() {
    html2canvas(this.screen.nativeElement).then((canvas) => {
      const link = document.createElement('a');
      const fileName = `banner-${new Date().toISOString()}.png`;
      link.href = canvas.toDataURL();
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  /* clipboard to HTML */
  copyContent() {
    const exportHtml = this.content.nativeElement.childNodes[0].outerHTML;
    this.clipboardService.copyFromContent(exportHtml);
  }

  /* clipboard config to JSON */
  copyConfig() {
    const configCopy = JSON.stringify(this.parameterForm.value);
    this.clipboardService.copyFromContent(configCopy);
  }
}

