/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	InspectorControls, 
	useBlockProps,
	MediaUpload, 
	MediaUploadCheck
} from '@wordpress/block-editor';
import { 
	Button,
	DatePicker, 
	Flex, FlexItem,
	PanelBody,
	ResponsiveWrapper,
	TextControl, 
	ToggleControl 
} from '@wordpress/components'

import { useState } from 'react';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {

	const {
		eventImageId, eventImageUrl, 
		showEventDateTime, eventDate, eventStartTime, eventEndTime, 
		showEventLocation, eventLocation,
		showRegisterLink, eventRegisterLink, eventRegisterText
	} = attributes;

	const todayDate = new Date();
	let displayDate = moment(todayDate).format('MMM D, Y');
	let displayStartTime = moment(todayDate).format('hh:mm a');
	let displayEndTime = displayStartTime;

	const removeMedia = () => {
		setAttributes({
			eventImageId: undefined,
			eventImageUrl: undefined
		});
	}
 
 	const onSelectMedia = (media) => {
		console.log(media);
		setAttributes({
			eventImageId: media.id,
			eventImageUrl: media.url
		});
	}

	let displayWhen;
	let displayWhere;

    if ( showEventDateTime ) 
	{
		displayDate = eventDate ? eventDate : displayDate;
		displayStartTime = eventStartTime ? eventStartTime : displayStartTime;
		displayEndTime = eventEndTime ? eventEndTime : displayEndTime;
    }

	displayWhen = displayDate + ' | ' + displayStartTime + ' - ' + displayEndTime;

	const [ date, setDate ] = useState( eventDate );
	const [ startTime, setStartTime ] = useState( moment(displayStartTime, "HH:mm a").format("HH:mm") );
	const [ endTime, setEndTime ] = useState( moment(displayEndTime, "HH:mm a").format("HH:mm") );


	if ( showEventLocation )
	{
		displayWhere = eventLocation;
	}
	// console.log(todayDate);
	console.log([displayDate, displayStartTime, displayEndTime]);
	console.log([date, startTime, endTime]);
	// console.log(moment(eventStartTime, "HH:mm a").format("HH:mm"));

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Event Image', 'event-block' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectMedia}
							value={eventImageId}
							allowedTypes={ ['image'] }
							render={({open}) => (
								<Button 
									className={eventImageId == undefined ? 'btn btn-primary__outline' : 'btn btn-image'}
									onClick={open}
								>
								{eventImageId == undefined && __('Choose an image', 'event-block')}
								{eventImageId != undefined && 
									<ResponsiveWrapper>
										<img src={eventImageUrl} />
									</ResponsiveWrapper>
								}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					<Flex>
					{eventImageId != undefined && 
						<MediaUploadCheck>
							<MediaUpload
								title={__('Replace image', 'event-block')}
								value={eventImageId}
								onSelect={onSelectMedia}
								allowedTypes={['image']}
								render={({open}) => (
									<Button onClick={open} isLarge>{__('Replace image', 'event-block')}</Button>
								)}
							/>
						</MediaUploadCheck>
					}
					{eventImageId != undefined && 
						<MediaUploadCheck>
							<Button onClick={removeMedia} isDestructive>{__('Remove image', 'awp')}</Button>
						</MediaUploadCheck>
					}
					</Flex>
				</PanelBody>

                <PanelBody title={ __( 'Datetime Settings', 'event-block' ) }>
					<ToggleControl
						checked = { !! showEventDateTime }
						label = { __(
							'Show event datetime',
							'event-block'
						) }
						onChange = { () =>
							setAttributes( {
								showEventDateTime: ! showEventDateTime,
							} )
						}
					/>
                    { showEventDateTime && (
						<Flex direction="column">
							<FlexItem>
							<fieldset className = "event-block__fieldset">
								<label className = 'event-block__label'>Event Date</label>
								<DatePicker
									currentDate = { date }
									value = { displayDate || '' }
									onChange = { 
										( value ) => {
											setAttributes( { eventDate: moment(new Date(value)).format('MMM D, Y') } ) 
											setDate(value)
										}
									}
								/>
							</fieldset>
							</FlexItem>
							<FlexItem>
								<TextControl
									label = { __(
										'Event Start Time',
										'event-block'
									) }
									type = 'time'
									value = { startTime }
									onChange = { 
										( value ) => {
											console.log(value)
											setAttributes( { eventStartTime: moment(value, [moment.ISO_8601, 'HH:mm']).format("hh:mm a") } )
											setStartTime( value )
										}
									}
								/>
							</FlexItem>
							<FlexItem>
								<TextControl
									label = { __(
										'Event End Time',
										'event-block'
									) }
									type = 'time'
									value = { endTime }
									onChange = { 
										( value ) => {
											setAttributes( { eventEndTime: moment(value, [moment.ISO_8601, 'HH:mm']).format("hh:mm a") } )
											setEndTime( value )
										}
									}
								/>
							</FlexItem>
						</Flex>
                    ) }
                </PanelBody>

				<PanelBody title={ __( 'Location Settings', 'event-block' ) }>
					<ToggleControl
						checked = { !! showEventLocation }
						label = { __(
							'Show event location',
							'event-block'
						) }
						onChange = { () =>
							setAttributes( {
								showEventLocation: ! showEventLocation,
							} )
						}
					/>
                    { showEventLocation && (
						<TextControl
							label={ __(
								'Event Location',
								'event-block'
							) }
							value={ eventLocation || '' }
							onChange={ ( value ) =>
								setAttributes( { eventLocation: value } )
							}
						/>
                    ) }
                </PanelBody>
				<PanelBody title={ __( 'Register Button Settings', 'event-block' ) }>
					<ToggleControl
						checked = { !! showRegisterLink }
						label = { __(
							'Show event register link',
							'event-block'
						) }
						onChange = { () =>
							setAttributes( {
								showRegisterLink: ! showRegisterLink,
							} )
						}
					/>
                    { showRegisterLink && (
						<TextControl
							label={ __(
								'Event Register Text',
								'event-block'
							) }
							value={ eventRegisterText || '' }
							onChange={ ( value ) =>
								setAttributes( { eventRegisterText: value } )
							}
						/>
                    ) }
					{ showRegisterLink && (
						<TextControl
							label={ __(
								'Event Register URL',
								'event-block'
							) }
							value={ eventRegisterLink || '' }
							onChange={ ( value ) =>
								setAttributes( { eventRegisterLink: value } )
							}
						/>
                    ) }
                </PanelBody>
            </InspectorControls>
			
			<div { ...useBlockProps() }>
				<div class="wp-block-gsublog-event-block__event-image">
					{!eventImageUrl && 
						<div class="wp-block-gsublog-event-block__figure--place-holder"></div>
					}
						
					{eventImageUrl && 
						<figure class="wp-block-gsublog-event-block__figure">	
							<img class="wp-block-gsublog-event-block__image" src={ eventImageUrl }/> 
						</figure>
					}
					
				</div>

				<div class="wp-block-gsublog-event-block__event-details">

					{showEventDateTime &&
					<div class="wp-block-gsublog-event-block__column-4-8">

						<div class="wp-block-gsublog-event-block__column-4">
							<p><span class="wp-block-gsublog-event-block__calendar-icon"></span><strong>When:</strong></p>
						</div>
						<div class="wp-block-gsublog-event-block__column-8">
							<p>{ displayWhen }</p>
						</div>

					</div>
					}
					{showEventLocation &&
					<div class="wp-block-gsublog-event-block__column-4-8">

						<div class="wp-block-gsublog-event-block__column-4">
							<p><span class="wp-block-gsublog-event-block__map-icon"></span><strong>Where:</strong></p>
						</div>
						<div class="wp-block-gsublog-event-block__column-8">
							<p>{ displayWhere }</p>
						</div>

					</div>
					}
				</div>
				{showRegisterLink &&
				<div class="wp-block-gsublog-event-block__event-button">
					<a class="btn btn-primary" href={ eventRegisterLink }>{ eventRegisterText }</a>
				</div>
				}
			</div>
		</>
	);
}
