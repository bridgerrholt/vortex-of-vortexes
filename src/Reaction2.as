package  
{
	import fl.controls.Button;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	/**
	 * Collision with line segment
	 * @author Shiu
	 */
	[SWF(width = 400, height = 300)]
	public class Reaction2 extends Sprite
	{
		private var x1:Number, y1:Number;	//coordinate1, c1
		private var x2:Number, y2:Number;	//coordinate2, c2
		private var line:Vector2D;					//line vector from c1 to c2
		private var leftNormal:Vector2D;		//normal of line
		
		private var circles:Vector.<Circle>;		//array to contain all circles
		private var velos:Vector.<Vector2D>;	//array to contain velocity corresponding to circle
		private var b:Button;
		
		public function Reaction2() {
			//declaring coordinates
			x1 = 50; y1 = 100;			
			x2 = 250; y2 = 150;
			
			//drawing line
			graphics.lineStyle(3);		
			graphics.moveTo(x1, y1); graphics.lineTo(x2, y2)
			
			//forming line vectors
			line = new Vector2D(x2 - x1, y2 - y1);
			leftNormal = line.rotate(Math.PI * -0.5);
			
			//instantiate arrays
			circles = new Vector.<Circle>;
			velos = new Vector.<Vector2D>;
			for (var i:int = 0; i < 20; i++) {
				//create circles and add to array
				var circle:Circle = new Circle(0x0055AA); 
				addChild(circle); circle.x = i * 20;
				circles.push(circle);				
				//create velocities and add to array
				velos.push(new Vector2D(0, 2));
			}
			//refresh upon each frame
			stage.addEventListener(Event.ENTER_FRAME, refresh);
			b = new Button(); addChild(b); b.x = 10; b.y = 250; b.label="Restart"
			b.addEventListener(MouseEvent.MOUSE_DOWN, restart);
		}
		
		private function refresh(e:Event):void {
			for (var i:int = 0; i < circles.length; i++) {
				
				//calculating line's perpendicular distance to ball
				var c1_circle:Vector2D = new Vector2D(circles[i].x - x1, circles[i].y - y1);
				var c1_circle_onNormal:Number = c1_circle.projectionOn(leftNormal);
				var c1_circle_onLine:Number = c1_circle.projectionOn(line);		
				
				//check for collision
				if (Math.abs(c1_circle_onNormal) <= circles[i].radius){
					
					//check if within segment
					//if within segment, reposition and recalculate velocity
					if (line.dotProduct(c1_circle) > 0 && c1_circle_onLine < line.getMagnitude()) {
						
						//repostion circle
						var v_lineSeg:Vector2D = line.clone();
						v_lineSeg.setMagnitude(c1_circle_onLine);
						var v_leftNormSeg1:Vector2D = leftNormal.clone();
						v_leftNormSeg1.setMagnitude(circles[i].radius - 1);
						//v_leftNormSeg1.setMagnitude(circles[i].radius);	//uncomment this to check out the error: jittering effect
						
						var reposition:Vector2D = v_lineSeg.add(v_leftNormSeg1)
						circles[i].x = x1+reposition.x;
						circles[i].y = y1+reposition.y;
						
						//redefine velocity
						var v_leftNormSeg2:Vector2D = leftNormal.clone();
						var leftNormSeg2_mag:Number = Math.abs(velos[i].projectionOn(leftNormal))
						v_leftNormSeg2.setMagnitude(leftNormSeg2_mag);
						var veloAlongLine:Vector2D = velos[i].add(v_leftNormSeg2);
						
						circles[i].x += veloAlongLine.x;
						circles[i].y += veloAlongLine.y;
					}
					
					//if not in segment (e.g. slide out of segment), continue to fall down
					else {
						circles[i].x += velos[i].x;
						circles[i].y += velos[i].y;
					}
				}
				
				//No collision in the first place, fall down
				else	{
					circles[i].x += velos[i].x;
					circles[i].y += velos[i].y;
				}
			}
		}
		
		private function restart(e:MouseEvent):void {
			for (var i:int = 0; i < 20; i++) {
				circles[i].x = i * 20;
				circles[i].y = 0
				velos[i] = new Vector2D(0, 2);
			}
		}
		
	}

}