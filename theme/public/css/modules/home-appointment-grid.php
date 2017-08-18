<?php if ( 1 == 0 ){ ?><style>/*This is a shady ass hack to force Dreamweaver to syntax highlight css in a php file.*/<?php } ?>
/*
* Home: Appointment Grid
*/
.difAppointmentGrid {
	margin: 2rem 0;
	font-family: "Lato" !important;
	box-shadow: -4px 4px 16px 4px hsla( 240, 0%, 0%, 0.1 );
}
.difAppointmentGrid * {
	font-family: "Lato" !important;
	font-style: normal !important;
	text-align: center;
}
.difAppointmentGrid header {
	display: flex;
}
.difAppointmentGrid header div {
	flex-basis: 25%;
}
.difAppointmentGrid header div h3 {
	margin: 0;
	padding: 1.5rem 0;
	font-size: 1.5rem;
	text-align: center;
	color: white;
}
<?php
for ( $h3 = 1, $o = 0.40; $h3 <= 4; ++$h3, $o += 0.20 )
{
	$rule = '.difAppointmentGrid header div:nth-child('.$h3.') h3 {'."\n\t".
			'background-color: hsla( 223, 63%, 22%, '.$o.' );'."\n".
			'}'."\n";
	echo $rule;
}
?>
.dif_grid {
	display: flex;
}
.dif_grid main {
	flex-basis: 75%;
	display: grid;
	grid-template-areas:
		"r1c1 r1c2 r1c3"
		"r2c1 r2c2 r2c3"
		"r3c1 r3c2 r3c3"
		"r4c1 r4c2 r4c3";
	grid-template-columns: repeat( 3, 1fr );
}
/* Column shadows */
.difAppointmentGrid header div {
	position: relative;
}
.dif_grid main [class*="dif_grid-"],
.dif_grid aside {
	position: relative;
	padding: 1rem;
}
.difAppointmentGrid header div:not(:nth-child(1)):before,
.dif_grid main [class*="dif_grid-"]:not([class*="c1"]):before,
.dif_grid aside:before {
	content: "";
	position: absolute;
	display: block;
	top: 0;
	right: 100%;
	bottom: 0;
	left: -16px;
	background: linear-gradient( 90deg, hsla( 0, 0%, 0%, 0.0 ) 0%, hsla( 240, 0%, 0%, 0.1 ) 100% );
}
.dif_grid main [class*="dif_grid-"] h4 {
	margin: 1rem 0 !important;
	font-size: 1.33rem;
}
.dif_grid main [class*="dif_grid-"] p,
.dif_grid aside p {
	font-size: 1.33rem;
}
<?php
for ( $r = 1; $r <= 4; ++$r )
{
	for ( $c = 1; $c <= 3; ++$c )
	{
		$selector = '.dif_grid-r'.$r.'c'.$c.' {'."\n";
		$rule = 	"\t".'grid-area: r'.$r.'c'.$c.';'."\n";
		if ( $r % 2 == 0 )
		{
			$rule .= "\t".'background-color: #fafafa;'."\n";
		}
		$selectorEnd = '}'."\n";
		echo $selector . $rule . $selectorEnd;
	}
}
?>
.dif_grid aside {
	flex-basis: 25%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 1rem 2rem;
}

