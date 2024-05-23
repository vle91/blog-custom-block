<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$event_image_url 		= isset($attributes['eventImageUrl']) ? $attributes['eventImageUrl'] : '';
$event_date 			= isset($attributes['eventDate']) ? $attributes['eventDate'] : '';
$event_start_time 		= isset($attributes['eventStartTime']) ? $attributes['eventStartTime'] : 'No Event Start Time Found';
$event_end_time 		= isset($attributes['eventEndTime']) ? $attributes['eventEndTime'] : 'No Event End Time Found';
$event_location 		= isset($attributes['eventLocation']) ? $attributes['eventLocation'] : '';
$event_register_link 	= isset($attributes['eventRegisterLink']) ? $attributes['eventRegisterLink'] : '';
$event_register_text 	= isset($attributes['eventRegisterText']) ? $attributes['eventRegisterText'] : '';

$display_when = '';

if (!empty($event_date))
{
	$display_when = $event_date . " | " . $event_start_time . " - " . $event_end_time;
}

?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="wp-block-gsublog-event-block__event-image">
		<?php  if(empty($event_image_url)) { ?>
		<div class="wp-block-gsublog-event-block__figure--place-holder"></div>
		<?php } else { ?>
			
		<figure class="wp-block-gsublog-event-block__figure">	
			<img class="wp-block-gsublog-event-block__image" src="<?= $event_image_url ?>"/> 
		</figure>
		<?php } ?>
		
	</div>

	<div class="wp-block-gsublog-event-block__event-details">

		<?php  if($display_when) { ?>
		<div class="wp-block-gsublog-event-block__column-4-8">

			<div class="wp-block-gsublog-event-block__column-4">
				<p><span class="wp-block-gsublog-event-block__calendar-icon"></span><strong>When:</strong></p>
			</div>
			<div class="wp-block-gsublog-event-block__column-8">
				<p><?php esc_html_e( $display_when, 'event-block' ); ?></p>
			</div>

		</div>
		<?php } ?>

		<?php  if($event_location) { ?>
		<div class="wp-block-gsublog-event-block__column-4-8">

			<div class="wp-block-gsublog-event-block__column-4">
				<p><span class="wp-block-gsublog-event-block__map-icon"></span><strong>Where:</strong></p>
			</div>
			<div class="wp-block-gsublog-event-block__column-8">
				<p><?php esc_html_e( $event_location, 'event-block' ); ?></p>
			</div>

		</div>
		<?php } ?>

	</div>
	<div class="wp-block-gsublog-event-block__event-button">
			<a class="btn btn-primary" href="<?= $event_register_link ?>"}><?= $event_register_text ?></a>
		</div>
</div>