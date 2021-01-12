
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class UnsignedNodeAnnouncement extends CommonBase {
	UnsignedNodeAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UnsignedNodeAnnouncement_free(ptr); }
	}

	public UnsignedNodeAnnouncement clone() {
		uint32_t ret = bindings.UnsignedNodeAnnouncement_clone(this.ptr);
		UnsignedNodeAnnouncement ret_hu_conv = new UnsignedNodeAnnouncement(null, ret);
		return ret_hu_conv;
	}

	public NodeFeatures get_features() {
		uint32_t ret = bindings.UnsignedNodeAnnouncement_get_features(this.ptr);
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		return ret_hu_conv;
	}

	public void set_features(NodeFeatures val) {
		bindings.UnsignedNodeAnnouncement_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public int get_timestamp() {
		int ret = bindings.UnsignedNodeAnnouncement_get_timestamp(this.ptr);
		return ret;
	}

	public void set_timestamp(int val) {
		bindings.UnsignedNodeAnnouncement_set_timestamp(this.ptr, val);
	}

	public byte[] get_node_id() {
		byte[] ret = bindings.UnsignedNodeAnnouncement_get_node_id(this.ptr);
		return ret;
	}

	public void set_node_id(byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_node_id(this.ptr, val);
	}

	public byte[] get_rgb() {
		byte[] ret = bindings.UnsignedNodeAnnouncement_get_rgb(this.ptr);
		return ret;
	}

	public void set_rgb(byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_rgb(this.ptr, val);
	}

	public byte[] get_alias() {
		byte[] ret = bindings.UnsignedNodeAnnouncement_get_alias(this.ptr);
		return ret;
	}

	public void set_alias(byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_alias(this.ptr, val);
	}

	public void set_addresses(NetAddress[] val) {
		bindings.UnsignedNodeAnnouncement_set_addresses(this.ptr, (uint32_t[])Arrays.stream(val).map(arr_conv_12 -> arr_conv_12.ptr).toArray());
		/* TODO 2 NetAddress  */;
	}

	public byte[] write() {
		byte[] ret = bindings.UnsignedNodeAnnouncement_write(this.ptr);
		return ret;
	}

	public static Result_UnsignedNodeAnnouncementDecodeErrorZ constructor_read(byte[] ser) {
		uint32_t ret = bindings.UnsignedNodeAnnouncement_read(ser);
		Result_UnsignedNodeAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedNodeAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
