import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CreativeEditorSDK, { AssetDefinition } from '@cesdk/cesdk-js';
import { CreativeEngine } from '@cesdk/cesdk-js';
import { BannerService } from 'src/app/services/banner.service';
import * as unsplash from 'unsplash-js';

declare const unsplashApi: any;


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})


export class DesignComponent {

  nom_campagne: string = '';


  banner = {
    nom_campagne: '',
    nom: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    title: '',
    subtitle: '',
    placeholder: '',
    plateformeType: '',
    callToAction: '',
    image: File
  };


  fileToSave: File;

  hasValue = false;

  showModal: boolean = true;

  @ViewChild('cesdk_container') containerRef: ElementRef = {} as ElementRef;

  title = 'Integrate CreativeEditor SDK with Angular';
  event: any;
  constructor(private router: Router, private route: ActivatedRoute, private bannerService: BannerService, private http: HttpClient) { }

  closeModal(): void {
    this.showModal = false;
  }

  ngAfterViewInit(): void {


    const config = {
      baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.10.1/assets',
      presets: {
        images: {
          imgly_logo: {
            // highlight-imageURL
            imageURL: 'https://img.ly/static/ubq_samples/imgly_logo.jpg',
            // highlight-imageURL
            // highlight-thumbnailURL
            thumbnailURL: 'https://img.ly/static/ubq_samples/thumbnails/imgly_logo.jpg',
            // highlight-thumbnailURL
            // highlight-width
            width: 1980,
            // highlight-width
            // highlight-height
            height: 720
            // highlight-height
          }
        },
        templates: {

          blank_1: {
            label: 'Template1',
            scene: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_blank_1.scene`,
            thumbnailURL: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_blank_1.png`
          },
          postcard_1: {
            label: 'Template2',
            scene: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_postcard_1.scene`,
            thumbnailURL: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_postcard_1.png`
          },
          postcard_2: {
            label: 'Template3',
            scene: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_postcard_2.scene`,
            thumbnailURL: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_postcard_2.png`
          },
          business_card_1: {
            label: 'Template4',
            scene: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_business_card_1.scene`,
            thumbnailURL: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_business_card_1.png`
          },
          instagram_photo_1: {
            label: 'Template5',
            scene: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_instagram_photo_1.scene`,
            thumbnailURL: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_instagram_photo_1.png`
          },
          instagram_story_1: {
            label: 'Template6',
            scene: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_instagram_story_1.scene`,
            thumbnailURL: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_instagram_story_1.png`
          },
          poster_1: {
            label: 'Template7',
            scene: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_poster_1.scene`,
            thumbnailURL: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_poster_1.png`
          },
          presentation_4: {
            label: 'Template8',
            scene: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_presentation_1.scene`,
            thumbnailURL: `${window.location.protocol}//${window.location.host}/assets/templates/cesdk_presentation_1.png`
          },
          collage_1: {
            label: 'Collage',
            scene: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_collage_1.scene`,
            thumbnailURL: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_collage_1.png`
          }

        }
      },

      locale: 'fr',
      i18n: {
        en: {
          'libraries.empty-custom-asset-source.label': 'Vide',
          "libraries.ly.img.audio.label": "Audio",
          "libraries.ly.img.audio.upload.label": "Téléchargements audio",
          "libraries.ly.img.image.label": "Images",
          "libraries.ly.img.image.upload.label": "Téléchargements image",
          "libraries.ly.img.local.label": "Locale",
          "libraries.ly.img.sticker.doodle.label": "Doodle",
          "libraries.ly.img.sticker.emoji.label": "Emoji",
          "libraries.ly.img.sticker.emoticons.label": "Emoticons",
          "libraries.ly.img.sticker.hand.label": "Hands",
          "libraries.ly.img.sticker.label": "Autocollants",
          "libraries.ly.img.template.label": "Modèles",
          "libraries.ly.img.text.headline.label": "Gros titre",
          "libraries.ly.img.text.label": "Texte",
          "libraries.ly.img.text.paragraph.label": "Paragraphe",
          "libraries.ly.img.text.title.label": "Titre",
          "libraries.ly.img.upload.label": "Uploads",
          "libraries.ly.img.vectorpath.abstract.label": "Abstract",
          "libraries.ly.img.vectorpath.label": "Formes",
          "libraries.ly.img.vectorpath.vectorpaths.label": "Basic",
          "libraries.ly.img.video.label": "Videos",
          "libraries.ly.img.video.upload.label": "Téléchargements video",
          "libraries.unsplash.label": "Unsplash",
          "property.backgroundColor": "Arrière-plan",
          "common.save": "Enregistrer",

        }
      },
      assetSources: {
        emptySource: {
          findAssets: () => {
            return Promise.resolve({
              assets: [],
              total: 0,
              currentPage: 1,
              nextPage: undefined
            });
          }
        }
      },
      navigation: {
        action: {
          close: true,
          back: true,
          save: true,
          load: true,
          export: true,
        }
      },
      callbacks: {
        log: (message: any, logLevel: any) => {
          switch (logLevel) {
            case 'Info':
              console.info(message);
              break;
            case 'Warning':
              console.warn(message);
              break;
            case 'Error':
              console.error(message);
              break;
            default:
              console.log(message);
          }
        },

        onUnsupportedBrowser: () => {
          /* This is the default window alert which will be shown in case an unsupported
           * browser tries to run CE.SDK */
          window.alert(
            'Your current browser is not supported.\nPlease use one of the following:\n\n- Mozilla Firefox 86 or newer\n- Apple Safari 14.1 or newer\n- Microsoft Edge 88 or newer\n- Google Chrome 88 or newer'
          );
        },

        onBack: () => {
          window.alert('Back callback!');
        },

        onClose: () => {
          window.alert('Close callback!');
        },

        onSave: (scene: string) => {
          const base64Data = btoa(unescape(encodeURIComponent(scene)));
          const blob = new Blob([base64Data], { type: 'application/octet-stream' });
          const url = URL.createObjectURL(blob);
          const element = document.createElement('a');
          element.setAttribute('href', url);
          element.setAttribute('download', `cesdk-${new Date().toISOString()}.scene`);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        },

        onLoad: () => {
          const element = document.createElement('input');
          element.setAttribute('type', 'file');
          element.setAttribute('accept', '.scene');

          element.style.display = 'none';
          document.body.appendChild(element);

          const handleLoad = () => {
            return new Promise<string>((resolve, reject) => {
              element.onchange = (e) => {
                const target = e.target as HTMLInputElement;
                if (!target || !target.files || target.files.length < 1) {
                  reject(new Error('No files selected'));
                } else {
                  const reader = new FileReader();
                  reader.readAsText(target.files[0], 'UTF-8');

                  reader.onload = (readerEvent) => {
                    const scene = readerEvent.target?.result as string;
                    resolve(scene);
                  };
                }

                element.onchange = null;
                element.value = '';
              };

              element.click();
            });
          };
          alert("Load success");
          return handleLoad();
        },

        onExport: (blobs: Blob[], options: any) => {
          const blob = blobs[0];

          // Check if the Blob is a PDF file
          if (blob.type === 'application/pdf') {
            alert('PDF export is not supported');
            return;
          }


          const element = document.createElement('a');
          element.setAttribute('href', window.URL.createObjectURL(blob));
          element.setAttribute('download', `cesdk-${new Date().toISOString()}.png`);

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
          alert('La bannière est enregistée');

          const formData = new FormData();
          formData.append('nom_campagne', this.banner.nom_campagne);
          formData.append('nom', this.banner.nom);
          formData.append('description', this.banner.description);
          formData.append('startDate', this.banner.startDate);
          formData.append('endDate', this.banner.endDate);
          formData.append('startTime', this.banner.startTime);
          formData.append('endTime', this.banner.endTime);
          formData.append('title', this.banner.title);
          formData.append('subtitle', this.banner.subtitle);
          formData.append('placeholder', this.banner.placeholder);
          formData.append('plateformeType', this.banner.plateformeType);
          formData.append('callToAction', this.banner.callToAction);
          formData.append(`image`, blob);
          this.bannerService.createBannerWithEditor(this.nom_campagne, formData).subscribe(
            (response) => {
              console.log('Banner saved successfully');
              alert('Votre bannière est créée!!');
              this.router.navigate([`/bannières/${this.getNomCampagne()}`]);
            },
            (err) => {
              console.error(err);
              alert(`Erreur lors de l'enregistrement de la bannière`);
            }
          )

        },

        onUpload: (file: File, onProgress: (progress: number) => void) => {
          const newImage = {
            id: 'exampleImageIdentifier',
            name: 'image',
            meta: {
              uri: 'local',
            }
          };
        
          const imageUrl = newImage.meta.uri; 
        
          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
        
          const cesdk_container = document.getElementById('image-container');
          if (cesdk_container) {
            cesdk_container.appendChild(imgElement);
          }        
          return Promise.resolve(newImage);
        }
        
      },
      ui: {
        elements: {
          navigation: {
            action: {
              close: true,
              back: true,
              save: true,
              load: true,
              export: true,
              download: true,

            }
          },
          libraries: {
            replace: {
              entries: (defaultEntries: any[], context: any) => {
                if (context.selectedBlocks.length !== 1) {
                  return [];
                }

                const [selectedBlock] = context.selectedBlocks;
                if (selectedBlock.blockType === 'ly.img.image') {
                  return [
                    ...defaultEntries,
                    {
                      id: 'empty-custom-asset-source-for-replace',
                      sourceIds: ['emptySource'],
                      previewLength: 3,
                      gridColumns: 3,
                      gridItemHeight: 'square'
                    }
                  ];
                }

                return [];
              },
            },
            insert: {
              entries: (defaultEntries: any[]) => {
                const imageEntry = defaultEntries.find((entry: any) => {
                  return entry.id === 'ly.img.image';
                });

                if (imageEntry) {
                  imageEntry.gridColumns = 4;
                }

                return [
                  ...defaultEntries,
                  {
                    id: 'empty-custom-asset-source',
                    sourceIds: ['emptySource'],
                    previewLength: 3,
                    gridColumns: 3,
                    gridItemHeight: 'square',

                    previewBackgroundType: 'contain',
                    gridBackgroundType: 'contain',
                    icon: ({ theme, iconSize }: { theme: string, iconSize: string }) => {
                      if (theme === 'dark') {
                        if (iconSize === 'normal') {
                          return 'https://img.ly/static/cesdk/guides/icon-normal-dark.svg';
                        } else {
                          return 'https://img.ly/static/cesdk/guides/icon-large-dark.svg';
                        }
                      }

                      if (iconSize === 'normal') {
                        return 'https://img.ly/static/cesdk/guides/icon-normal-light.svg';
                      } else {
                        return 'https://img.ly/static/cesdk/guides/icon-large-light.svg';
                      }
                    },
                  },
                  {
                    id: 'custom-images',
                    sourceIds: ['ly.img.image'],
                    previewLength: 5,
                    gridColumns: 5,
                    icon: 'https://img.ly/static/cesdk/guides/icon-normal-dark.svg',
                  },
                ];
              },
            },
          },


        }
      }
    };


    console.log('config', config);
    let cesdk;
    CreativeEditorSDK.init(this.containerRef.nativeElement, config).then(
      (instance: any) => {
        console.log('instance', instance);
        instance.addDefaultAssetSources();
        instance.addDemoAssetSources();
        cesdk = instance;
      }
    );


  }

  ngOnInit(): void {
    this.nom_campagne = this.route.snapshot.paramMap.get('nom_campagne') || '';
    console.log(this.nom_campagne);
    this.banner.nom_campagne = this.nom_campagne;
    console.log(this.banner.nom_campagne);
    this.getNomCampagne();
  }

  getNomCampagne() {
    console.log(this.banner.nom_campagne);
    return this.banner.nom_campagne;
  }

  onFileSelected(event: any) {
    this.fileToSave = event.target.files[0];
    return this.fileToSave;
  }


  onDateChange() {
    this.hasValue = true;
  }

  createBanner() {
    onExport: (blobs: Blob[], options: any) => {
      const blob = blobs[0];

      // Check if the Blob is a PDF file
      if (blob.type === 'application/pdf') {
        alert('PDF export is not supported');
        return;
      }


      const element = document.createElement('a');
      element.setAttribute('href', window.URL.createObjectURL(blob));
      element.setAttribute('download', `cesdk-${new Date().toISOString()}.png`);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
      alert('Export success');

      const formData = new FormData();

      this.bannerService.createBannerWithImageUpload(this.nom_campagne, formData).subscribe(
        (response) => {
          this.showModal = false;
          console.log('Banner saved successfully');
          alert('Votre bannière est créée!!');
          this.router.navigate([`/bannières/${this.getNomCampagne()}`]);
        },
        (err) => {
          console.error(err);
          alert('Error saving banner');
        }
      )
    }
  }

}
