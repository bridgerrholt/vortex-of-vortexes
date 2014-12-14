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
	public class Reaction1_1 extends Sprite
	{
		private var x1:Number, y1:Number;	//coordinate1, c1
		private var x2:Number, y2:Number;	//coordinate2, c2
		private var line:Vector2D;					//line vector from c1 to c2
		private var leftNormal:Vector2D;		//normal of line
		
		private var circles:Vector.<Circle>;		//array to contain all circles
		private var velos:Vector.<Vector2D>;	//array to contain velocity corresponding to circle
		private var b:Button;
		
		public function Reaction1_1() {
			//declaring coordinates
			x1 = 50; y1 = 100;			
			x2 = 250; y2 = 150;
			
			//drawing line
			graphics.lineStyle(3);		
			graphics.moveTo(x1, y1); graphics.lineTo(x2, y2)
			
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
			stage.addEventListener(MouseEvent.MOUSE_DOWN, start);
			stage.addEventListener(MouseEvent.MOUSE_UP, stop);
			
			b = new Button(); addChild(b); b.x = 10; b.y = 250; b.label="Restart"
			b.addEventListener(MouseEvent.MOUSE_DOWN, restart);
		}
		
		private function refresh(e:Event):void {
			//forming line vectors
			line = new Vector2D(x2 - x1, y2 - y1);
			leftNormal = line.rotate(Math.PI * -0.5);
			for (var i:int = 0; i < circles.length; i++) {
				
				//calculating line's perpendicular distance to ball
				var c1_circle:Vector2D = new Vector2D(circles[i].x - x1, circles[i].y - y1);
				var c1_circle_onNormal:Number = c1_circle.projectionOn(leftNormal);
				var c1_circle_onLine:Number = c1_circle.projectionOn(line);		
				
				//if collision happened, undo movement
				if (Math.abs(c1_circle_onNormal) <= circles[i].radius
				&& line.dotProduct(c1_circle) > 0
				&& c1_circle_onLine < line.getMagnitude()){
						
						//redefine velocity
						var v_leftNormSeg2:Vector2D = leftNormal.clone();
						var leftNormSeg2_mag:Number = Math.abs(velos[i].projectionOn(leftNormal))
						v_leftNormSeg2.setMagnitude(leftNormSeg2_mag);
						velos[i] = velos[i].add(v_leftNormSeg2.multiply(2));
				}
				circles[i].x += velos[i].x;
				circles[i].y += velos[i].y;
			}
		}
		
		private function restart(e:MouseEvent):void {
			for (var i:int = 0; i < 20; i++) {
				circles[i].x = i * 20;
				circles[i].y = 0
				velos[i] = new Vector2D(0, 2);
			}
		}
		
		private function start(e:MouseEvent):void {
			var distance:Number = Math2.Pythagoras(x2, y2, mouseX, mouseY);
			if (distance < 20) stage.addEventListener(MouseEvent.MOUSE_MOVE, change);
		}
		
		private function change(e:MouseEvent):void {
			x2 = mouseX; y2 = mouseY;
			graphics.clear(); graphics.lineStyle(2);
			graphics.moveTo(x1, y1); graphics.lineTo(x2, y2);
		}
		
		private function stop(e:MouseEvent):void {
			stage.removeEventListener(MouseEvent.MOUSE_MOVE, change);
		}
	}

}