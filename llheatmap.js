/* Heat-map for LikeLines "Light"; Must be included after lllight.js */
LLL.HEATMAP = {
	DEFAULT_WIDTH: LLL.DEFAULT_WIDTH,
	DEFAULT_HEIGHT: 20,

	CSS_CLASSES: ["lll-heatmap"],
};

(function (LLL, HEATMAP, $) {
	
	HEATMAP.injectHeatmapsIntoDOM = function () {
		var exec = function () {
			$('.lll-heatmap:not(canvas)').each(function() {
				var $heatmap_div = $(this);
				
				var lllplayer_exposed_name = $heatmap_div.data('for');
				var width = $heatmap_div.data('width');
				var height = $heatmap_div.data('height');
				
				var lllplayer = window[lllplayer_exposed_name];
				var exposed_name = $heatmap_div.data('name');
				
				var heatmap = new HEATMAP.Heatmap(this, lllplayer, width, height);
				
				if (exposed_name !== undefined) {
					window[exposed_name] = heatmap;
				}
			});
		};
		
		// NOTE: An lllplayer is created *after* the YouTube API has loaded.
		// Since heat-maps depend on an lllplayer, execution needs to be deferred as well.
		if (LLL._ytReady) {
			exec();
		}
		else {
			LLL._creationQueue.push(exec);
		}
	};
	
	HEATMAP.Heatmap = function(node, lllplayer, width, height) {
		this.canvas = undefined;
		this.lllplayer = lllplayer;
		
		this.width = width || HEATMAP.DEFAULT_WIDTH;
		this.height = height || HEATMAP.DEFAULT_HEIGHT;
		
		
		var node_attrs = {};
		$.each(node.attributes, function (idx, attr) {
			node_attrs[attr.nodeName] = attr.nodeValue;
		});
		node_attrs.width = this.width;
		node_attrs.height = this.height;
		
		this.canvas = $('<canvas>', node_attrs)[0];
		$(node).replaceWith(this.canvas)
	};
	
})(LLL, LLL.HEATMAP, jQuery);


jQuery(document).ready(LLL.HEATMAP.injectHeatmapsIntoDOM);
